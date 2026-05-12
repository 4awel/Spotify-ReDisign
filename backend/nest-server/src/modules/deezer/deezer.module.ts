import { Module } from '@nestjs/common';
import { DeezerController } from './deezer.controller';
import { DeezerService } from './deezer.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [DeezerController],
  providers: [DeezerService],
  exports: [DeezerService],
})
export class DeezerModule {}
