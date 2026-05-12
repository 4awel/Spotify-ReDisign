import { Expose, Type } from 'class-transformer';
import { IsArray, IsObject, IsOptional } from 'class-validator';

class ArtistDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  picture: string;

  @Expose()
  tracklist: string;

  @Expose()
  type: string;
}

class TrackItemDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  artist: string;

  @Expose()
  album: string;

  @Expose()
  duration: number;

  @Expose()
  coverUrl: string;

  @Expose()
  previewUrl: string;

  @Expose()
  artistId: number;

  @Expose()
  albumId: number;

  @Expose()
  isExplicit: boolean;

  @Expose()
  rank: number;

  @Expose()
  @IsOptional()
  isLiked?: boolean;
}

export class DeezerSearchResponseDto {
  @Expose()
  @IsOptional()
  @Type(() => ArtistDto)
  artist?: ArtistDto | null;

  @Expose()
  @IsArray()
  @Type(() => TrackItemDto)
  tracklist: TrackItemDto[];
}

export class DeezerChartResponseDto {
  @Expose()
  @IsArray()
  @Type(() => TrackItemDto)
  tracks: TrackItemDto[];
}
