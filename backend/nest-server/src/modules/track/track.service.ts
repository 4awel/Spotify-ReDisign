import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class TrackService {
  constructor(private userService: UserService) {}

  async likeTrack(userId: string, trackId: number) {
    return this.userService.addLikedTrack(userId, trackId);
  }
}
