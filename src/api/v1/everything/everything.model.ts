import { IEverything, EverythingSchema } from './everything.schema';
import BaseModel from '../../../framework/base.model';
import { AccessibleRecordModel } from '@casl/mongoose';

export default class EverythingModel extends BaseModel {
    getSchema(): AccessibleRecordModel<IEverything> {
        return EverythingSchema;
    }


}
