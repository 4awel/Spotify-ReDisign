import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import type { JwtPayload } from 'src/types/jwt-type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload || !payload.id) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const user = await this.authService.validateUser(payload.id);
    if (!user) {
      throw new UnauthorizedException('User not found or token invalid');
    }

    return {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
    };
  }
}
