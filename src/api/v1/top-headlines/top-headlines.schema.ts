import { cleanObject } from '../../../framework/utils/db/genericFunctions';
import { createStrongSchema, ISchema, StrongSchema, DocumentStatusEnum } from '../../../framework/utils/db/baseInterface.interface';
import * as mongoose from 'mongoose';
import { AccessibleModel } from '@casl/mongoose';

export interface ITopHeadlines extends ISchema {

    source:{
    id:string,
    name:string
    },
    author:string,
    title:string,
    description:string,
    url:string,
    urlToImage:string,
    publishedAt:string,
    content:string
}

const StrongSchema = createStrongSchema<ITopHeadlines>(
    {
          source:{type:{
            id:{type:String},
            name:{type:String}
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

export const TopHeadlinesSchema = mongoose.model<ITopHeadlines, AccessibleModel<ITopHeadlines>>('TopHeadlines', StrongSchema);
