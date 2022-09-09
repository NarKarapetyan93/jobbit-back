import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { CompanyAuthModule } from './company-auth/company-auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/jobbit'),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
    UsersModule,
    AuthModule,
    CompaniesModule,
    CompanyAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
