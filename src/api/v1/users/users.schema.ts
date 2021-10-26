import { cleanObject } from '../../../framework/utils/db/genericFunctions';
import { createStrongSchema, ISchema, StrongSchema, DocumentStatusEnum } from '../../../framework/utils/db/baseInterface.interface';
import * as mongoose from 'mongoose';
import { AccessibleModel } from '@casl/mongoose';

export enum Roles {
    Analyst = 1,
    Admin = 2
}

export interface IUser extends ISchema {
    first_name: string;
    last_name: string;
    password: string;
    username: string;
    role: number;
}

const StrongSchema = createStrongSchema<IUser>(
    {
        first_name: { type: String, lowercase: true },
        last_name: { type: String, lowercase: true },
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: { type: Number, enum: [Roles.Admin, Roles.Analyst] },
        status: { type: Number, default: DocumentStatusEnum.ACTIVE }
    },
    { timestamps: true }
);

StrongSchema.methods.toJSON = function () {
    return cleanObject(this.toObject());
};

export const UsersSchema = mongoose.model<IUser, AccessibleModel<IUser>>('Users', StrongSchema);
