import { cleanObject } from '../../../framework/utils/db/genericFunctions';
import { createStrongSchema, ISchema, StrongSchema } from '../../../framework/utils/db/baseInterface.interface';
import * as mongoose from 'mongoose';
import { AccessibleModel } from '@casl/mongoose';

export interface ISource extends ISchema {
  id: string;
  name:string;
  description: string,
  url: string,
  category: string,
  language: string,
  country: string
}

const StrongSchema = createStrongSchema<ISource>(
    {
      id: {type:String},
      name:{type:String},
      description: {type:String},
      url: {type:String},
      category: {type:String},
      language: {type:String},
      country: {type:String}
    },
    { timestamps: true }
);

StrongSchema.methods.toJSON = function () {
    return cleanObject(this.toObject());
};

export const SourceSchema = mongoose.model<ISource, AccessibleModel<ISource>>('Source', StrongSchema);
