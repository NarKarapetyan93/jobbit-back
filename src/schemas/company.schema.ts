import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop()
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  about: string;

  @Prop({ default: null })
  avatar: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  refreshToken: string;

  @Prop({ default: false })
  isVerified: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
