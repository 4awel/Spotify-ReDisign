import { Controller, Get, Query, Put, UseGuards } from '@nestjs/common';
import { TrackService } from './track.service';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Put('liked')
  @UseGuards(JwtAuthGuard)
  async likeTrack(
    @Query('trackId') trackId: string,
    @GetUser('id') userId: string,
  ) {
    return this.trackService.likeTrack(userId, parseInt(trackId, 10));
  }
}
