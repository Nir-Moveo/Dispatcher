import { cleanObject } from '../../../framework/utils/db/genericFunctions';
import { createStrongSchema, ISchema, StrongSchema, DocumentStatusEnum } from '../../../framework/utils/db/baseInterface.interface';
import * as mongoose from 'mongoose';
import { AccessibleModel } from '@casl/mongoose';

export interface IEverything extends ISchema {

    source:{
      id:string,
      name:string,
      language:string,
      category:string,
      country:string
    },
    author:string,
    title:string,
    description:string,
    url:string,
    urlToImage:string,
    publishedAt:string,
    content:string
}

const StrongSchema = createStrongSchema<IEverything>(
    {
          source:{type:{
            id:{type:String},
            name:{type:String},
            language:{type:String},
            category:{type:String},
            country:{type:String}
          },
        },
          author:{type:String},
          title:{type:String},
          description:{type:String},
          url:{type:String},
          urlToImage:{type:String},
          publishedAt:{type:String},
          content:{type:String},
    },
    { timestamps: true }
);

StrongSchema.methods.toJSON = function () {
    return cleanObject(this.toObject());
};

export const EverythingSchema = mongoose.model<IEverything, AccessibleModel<IEverything>>('Everything', StrongSchema);
