import { IUser, UsersSchema } from './users.schema';
import BaseModel from '../../../framework/base.model';
import { AccessibleRecordModel } from '@casl/mongoose';
import { DocumentStatusEnum } from '../../../framework/utils/db/baseInterface.interface';

export default class UsersModel extends BaseModel {
    getSchema(): AccessibleRecordModel<IUser> {
        return UsersSchema;
    }
    /**
     * Check if username already exist
     * @param username - username for user login, this field is unique
     */
    isUserExist(username: string): boolean | PromiseLike<boolean> {
        return this.schema.findOne({ username, status: DocumentStatusEnum.ACTIVE }).then((user) => (user ? true : false));
    }
}
