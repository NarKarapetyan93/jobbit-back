import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

export const UserMongooseModuleHelper = () => {
  return MongooseModule.forFeatureAsync([
    {
      name: User.name,
      useFactory: () => {
        const schema = UserSchema;
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
