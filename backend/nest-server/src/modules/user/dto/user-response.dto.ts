import { Expose, Type } from 'class-transformer';

class LikedTrackDto {
  @Expose()
  trackId: number = 0;

  @Expose()
  addedAt: Date = new Date();
}

export class UserResponseDto {
  @Expose()
  id: string = '';

  @Expose()
  username: string = '';

  @Expose()
  email: string = '';

  @Expose()
  @Type(() => LikedTrackDto)
  likedTracks: LikedTrackDto[] = [];

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}
