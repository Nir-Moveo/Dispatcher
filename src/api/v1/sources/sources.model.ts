import { ISource, SourceSchema } from './sources.schema';
import BaseModel from '../../../framework/base.model';
import { AccessibleRecordModel } from '@casl/mongoose';

export default class SourceModel extends BaseModel {
    getSchema(): AccessibleRecordModel<ISource> {
        return SourceSchema;
    }


}
