import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DeezerService } from './deezer.service';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@Controller('deezer')
export class DeezerController {
  constructor(private deezerService: DeezerService) {}

  @Get('search')
  async searchTracks(@Query('value') query: string) {
    return this.deezerService.searchTracks(query);
  }

  @Get('api')
  async getChartTracks(@Query('userId') userId?: string) {
    return this.deezerService.getChartTracks(userId);
  }

  @Get('artist/playlist')
  async getArtistPlaylist(@Query('id') artistId: number) {
    return this.deezerService.getArtistPlaylist(artistId);
  }

  @Get('liked/tracklist')
  @UseGuards(JwtAuthGuard)
  async getLikedTracks(
    @GetUser('id') userId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 20;
    const offsetNum = offset ? parseInt(offset, 10) : 0;
    return this.deezerService.getLikedTracksDetails(
      userId,
      limitNum,
      offsetNum,
    );
  }
}
