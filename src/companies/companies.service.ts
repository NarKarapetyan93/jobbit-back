import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Company, CompanyDocument } from '../schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<CompanyDocument> {
    const companyData = {
      _id: uuidv4(),
      ...createCompanyDto,
    };
    const createdCompany = new this.companyModel(companyData);
    return createdCompany.save();
  }

  async findAll(): Promise<CompanyDocument[]> {
    return this.companyModel.find().exec();
  }

  async findOne(id: string): Promise<CompanyDocument> {
    return this.companyModel.findById(id);
  }

  async findByEmail(email: string): Promise<Company> {
    return this.companyModel.findOne({ email: email }).lean().exec();
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanyDocument> {
    return this.companyModel
      .findByIdAndUpdate(id, updateCompanyDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<CompanyDocument> {
    return this.companyModel.findByIdAndDelete(id).exec();
  }
}
