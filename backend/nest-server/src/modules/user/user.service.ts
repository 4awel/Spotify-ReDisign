import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.shema';
import type { LikedTrack } from 'src/types/track';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    if (!email) return null;
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string | Types.ObjectId): Promise<UserDocument | null> {
    if (!id || !Types.ObjectId.isValid(id.toString())) {
      return null;
    }
    return this.userModel.findById(id).exec();
  }

  async getUserData(userId: string): Promise<UserResponseDto> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const response = new UserResponseDto();
    response.id = user._id.toString();
    response.username = user.username;
    response.email = user.email;
    response.likedTracks = user.likedTracks.map((track) => ({
      trackId: track.trackId,
      addedAt: track.addedAt,
    }));
    response.createdAt = user.createdAt;
    response.updatedAt = user.updatedAt;

    return response;
  }

  async addLikedTrack(
    userId: string,
    trackId: number,
  ): Promise<{ isLiked: boolean; likesCount: number }> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingLikeIndex = user.likedTracks.findIndex(
      (track: LikedTrack) => track.trackId === trackId,
    );

    if (existingLikeIndex !== -1) {
      // Remove like
      user.likedTracks.splice(existingLikeIndex, 1);
      await user.save();
      return { isLiked: false, likesCount: user.likedTracks.length };
    } else {
      // Add like
      user.likedTracks.push({
        trackId,
        addedAt: new Date(),
      });
      await user.save();
      return { isLiked: true, likesCount: user.likedTracks.length };
    }
  }

  async getLikedTracks(
    userId: string,
    limit: number = 20,
    offset: number = 0,
  ): Promise<{ tracks: LikedTrack[]; total: number }> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const startIndex = offset * limit;
    const endIndex = Math.min(startIndex + limit, user.likedTracks.length);

    return {
      tracks: user.likedTracks.slice(startIndex, endIndex),
      total: user.likedTracks.length,
    };
  }
}
