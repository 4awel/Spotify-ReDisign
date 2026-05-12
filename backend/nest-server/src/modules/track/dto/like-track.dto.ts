import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class LikeTrackDto {
  @IsNumber()
  trackId: number;

  @IsString()
  userId: string;
}

export class LikeTrackResponseDto {
  @IsString()
  message: string;

  @IsBoolean()
  isLiked: boolean;

  @IsNumber()
  likesCount: number;
}
