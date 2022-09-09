import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RefreshTokenGuard } from '../common/guards/jwt-refresh.guard';
import { AuthDto } from '../common/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() data: AuthDto) {
    return this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user.userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Request() req) {
    const { userId } = req.user;
    const refreshToken = req
      .header('Authorization')
      .replace('Bearer', '')
      .trim();
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
