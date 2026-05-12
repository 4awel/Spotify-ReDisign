import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('data')
  @UseGuards(JwtAuthGuard)
  async getUserData(@GetUser('id') userId: string): Promise<UserResponseDto> {
    return this.userService.getUserData(userId);
  }
}
