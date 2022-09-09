import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CompanyAuthService } from './company-auth.service';
import { CompanyAuthController } from './company-auth.controller';
import { MongoosePreSaveHelper } from '../helpers/mongoose-pre-save.helper';
import { Company, CompanySchema } from '../schemas/company.schema';
import { CompaniesModule } from '../companies/companies.module';
import { CompaniesService } from '../companies/companies.service';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { RefreshTokenStrategy } from '../common/strategies/refresh-token.strategy';

@Module({
  imports: [
    CompaniesModule,
    PassportModule,
    JwtModule.register({}),
    MongoosePreSaveHelper(Company, CompanySchema),
  ],
  providers: [
    CompaniesService,
    CompanyAuthService,
    JwtStrategy,
    RefreshTokenStrategy,
  ],
  controllers: [CompanyAuthController],
})
export class CompanyAuthModule {}
