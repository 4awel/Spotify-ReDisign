import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { UserService } from '../user/user.service';
import type { DeezerTrack, FormattedTrack } from '../../types/deezer';

@Injectable()
export class DeezerService {
  constructor(private userService: UserService) {}

  async searchTracks(
    query: string,
  ): Promise<{ artist: any | null; tracklist: FormattedTrack[] }> {
    const sanitizedQuery = query?.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '') || '';

    try {
      const response = await axios.get(
        `https://api.deezer.com/search?q=${sanitizedQuery}&limit=30`,
      );

      if (!response.data?.data?.length) {
        throw new HttpException('No tracks found', HttpStatus.NOT_FOUND);
      }

      const tracks = response.data.data.map((track: DeezerTrack) =>
        this.formatTrack(track),
      );

      // Get artist info
      if (tracks[0]?.artistId) {
        try {
          const artistResponse = await axios.get(
            `https://api.deezer.com/artist/${tracks[0].artistId}`,
          );
          return {
            artist: this.formatArtist(artistResponse.data),
            tracklist: tracks,
          };
        } catch {
          return { artist: null, tracklist: tracks };
        }
      }

      return { artist: null, tracklist: tracks };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Error fetching from Deezer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getChartTracks(userId?: string): Promise<FormattedTrack[]> {
    try {
      const response = await axios.get(
        'https://api.deezer.com/search?q=MAKE FAMILY NOT FRIENDS&limit=300',
      );

      let userLikedTracks: string[] = [];
      if (userId) {
        const user = await this.userService.findById(userId);
        if (user?.likedTracks) {
          userLikedTracks = user.likedTracks.map((track) =>
            track.trackId.toString(),
          );
        }
      }

      return response.data.data.map((track: DeezerTrack) => ({
        ...this.formatTrack(track),
        isLiked: userId ? userLikedTracks.includes(track.id.toString()) : false,
      }));
    } catch (error) {
      throw new HttpException(
        'Error fetching chart tracks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getArtistPlaylist(artistId: number): Promise<FormattedTrack[]> {
    try {
      const artistResponse = await axios.get(
        `https://api.deezer.com/artist/${artistId}`,
      );

      const tracklistResponse = await axios.get(artistResponse.data.tracklist);

      return tracklistResponse.data.data.map((track: DeezerTrack) =>
        this.formatTrack(track),
      );
    } catch (error) {
      throw new HttpException(
        'Artist or tracks not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getLikedTracksDetails(
    userId: string,
    limit: number = 20,
    offset: number = 0,
  ): Promise<FormattedTrack[]> {
    const { tracks: likedTracks } = await this.userService.getLikedTracks(
      userId,
      limit,
      offset,
    );

    const trackDetails: FormattedTrack[] = [];
    for (const likedTrack of likedTracks) {
      try {
        const response = await axios.get(
          `https://api.deezer.com/track/${likedTrack.trackId}`,
        );
        trackDetails.push(this.formatTrack(response.data));
      } catch (error) {
        console.error(`Error fetching track ${likedTrack.trackId}:`, error);
      }
    }

    return trackDetails;
  }

  private formatTrack(track: any): FormattedTrack {
    return {
      id: track.id,
      title: track.title || '',
      artist: track.artist?.name || '',
      album: track.album?.title || '',
      duration: track.duration || 0,
      coverUrl: track.album?.cover_medium || '',
      previewUrl: track.preview || '',
      artistId: track.artist?.id || 0,
      albumId: track.album?.id || 0,
      isExplicit: track.explicit_lyrics || false,
      rank: track.rank || 0,
    };
  }

  private formatArtist(artist: any): any {
    return {
      id: artist.id,
      name: artist.name,
      picture: artist.picture,
      tracklist: artist.tracklist,
      type: artist.type,
    };
  }
}
