import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RefreshTokenGuard } from '../common/guards/jwt-refresh.guard';
import { CompanyAuthService } from './company-auth.service';
import { CreateCompanyDto } from '../companies/dto/create-company.dto';
import { AuthDto } from '../common/dto/auth.dto';

@Controller('auth/company')
export class CompanyAuthController {
  constructor(private readonly authService: CompanyAuthService) {}

  @Post('register')
  async register(@Body() createCompanyDto: CreateCompanyDto) {
    return this.authService.register(createCompanyDto);
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
