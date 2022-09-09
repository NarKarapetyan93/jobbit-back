import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from '../schemas/user.schema';
import { MongoosePreSaveHelper } from '../helpers/mongoose-pre-save.helper';

@Module({
  imports: [MongoosePreSaveHelper(User, UserSchema)],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
