import { ITopHeadlines, topHeadlinesSchema } from './top-headlines.schema';
import BaseModel from '../../../framework/base.model';
import { AccessibleRecordModel } from '@casl/mongoose';

export default class topHeadlinesModel extends BaseModel {
    getSchema(): AccessibleRecordModel<ITopHeadlines> {
        return topHeadlinesSchema;
    }


}
