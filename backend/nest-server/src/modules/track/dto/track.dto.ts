import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class TrackDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  artist: string;

  @Expose()
  @IsString()
  album: string;

  @Expose()
  @IsNumber()
  duration: number;

  @Expose()
  @IsString()
  coverUrl: string;

  @Expose()
  @IsString()
  previewUrl: string;

  @Expose()
  @IsNumber()
  artistId: number;

  @Expose()
  @IsNumber()
  albumId: number;

  @Expose()
  @IsBoolean()
  isExplicit: boolean;

  @Expose()
  @IsNumber()
  rank: number;

  @Expose()
  @IsOptional()
  @IsBoolean()
  isLiked?: boolean;
}
