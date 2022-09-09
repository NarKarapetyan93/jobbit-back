import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { MongoosePreSaveHelper } from '../helpers/mongoose-pre-save.helper';
import { Company, CompanySchema } from '../schemas/company.schema';

@Module({
  imports: [MongoosePreSaveHelper(Company, CompanySchema)],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
