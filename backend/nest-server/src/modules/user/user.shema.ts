import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import type { LikedTrack } from 'src/types/track';

export type UserDocument = User & Document & {
    createdAt: Date,
    updatedAt: Date
};

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [
      {
        trackId: { type: Number, required: true },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  likedTracks: LikedTrack[];
}

export const UserSchema = SchemaFactory.createForClass(User);
