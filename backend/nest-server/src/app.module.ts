import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TrackModule } from './modules/track/track.module';
import { DeezerModule } from './modules/deezer/deezer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_URI') ||
          'mongodb://localhost:27017/DBSpotify',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    TrackModule,
    DeezerModule,
  ],
})
export class AppModule {}
