import { DocumentStatusEnum } from '../../../framework/utils/db/baseInterface.interface';

import BaseHandler from '../../../framework/base.handler';
import UsersModel from './users.model';
import AuthHandler from '../auth/auth.handler';

export class UsersHandler extends BaseHandler<UsersModel> {
    getModel(): UsersModel {
        return new UsersModel();
    }

    /**
     * Check if username already exist
     * @param username - username for user login, this field is unique
     */
    isUserExist(username: string): boolean | PromiseLike<boolean> {
        return this.model.isUserExist(username);
    }

    insert(user: any) {
        return new AuthHandler().generateSaltAndHashPassword(user.password).then((hashPassword) => this.model.insert({ ...user, password: hashPassword }));
    }

    /**
     * This function update the user data.
     * if the data include new password, we hashing the password and save the new password
     *
     * @param id - user id to update
     * @param user - user object to update
     */
    updateById(id: string, user: any): any {
        if (user.password) {
            return new AuthHandler().generateSaltAndHashPassword(user.password).then((hashPassword) => super.updateById(id, { ...user, password: hashPassword }));
        }
        //  Delete password undefined field
        delete user.password;
        return super.updateById(id, user);
    }
}
