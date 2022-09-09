import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

export const MongoosePreSaveHelper = (model, schema) => {
  return MongooseModule.forFeatureAsync([
    {
      name: model.name,
      useFactory: () => {
        schema.pre('save', async function (next) {
          if (!this.isModified('password')) return next();
          try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            return next();
          } catch (error) {
            return next(error);
          }
        });

        return schema;
      },
    },
  ]);
};
