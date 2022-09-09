import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { RefreshTokenStrategy } from '../common/strategies/refresh-token.strategy';
import { MongoosePreSaveHelper } from '../helpers/mongoose-pre-save.helper';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({}),
    MongoosePreSaveHelper(User, UserSchema),
  ],
  providers: [UsersService, AuthService, JwtStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
