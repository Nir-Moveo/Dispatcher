import { ITopHeadlines, TopHeadlinesSchema } from './top-headlines.schema';
import BaseModel from '../../../framework/base.model';
import { AccessibleRecordModel } from '@casl/mongoose';

export default class TopHeadlinesModel extends BaseModel {
    getSchema(): AccessibleRecordModel<ITopHeadlines> {
        return TopHeadlinesSchema;
    }


}
