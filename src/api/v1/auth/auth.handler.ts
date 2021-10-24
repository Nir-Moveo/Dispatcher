import { LoginException } from '../../../exceptions';
import BaseHandler from '../../../framework/base.handler';
import UsersModel from '../users/users.model';
import { IUser } from '../users/users.schema';
import * as bcrypt from 'bcryptjs';
import { JWTController } from './utils/jwt.controller';

export default class AuthHandler extends BaseHandler<UsersModel> {
    getModel(): UsersModel {
        return new UsersModel();
    }

    /**
     * Create user in the salesforce
     * @param user
     */
    register(user: IUser) {
        return this.generateSaltAndHashPassword(user.password).then((hashPassword) => {
            return this.model.schema.create({ ...user, password: hashPassword });
        });
    }

    /**
     * This function check the user passwords and username supply be the web app and compare it against
     * the database. if the compare was success the user authorize to login else the user is not authorized.
     *
     * @param username - username for application registration
     * @param password  - password for registration
     */
    async login(username: string, password: string): Promise<any> {
        return this.model.schema
            .findOne({ username })
            .then((user: IUser) => {
                //User exist we compare passwords
                if (user) {
                    return (
                        this.comparePassword(password, user.password)
                            // Compare password success --> login flow
                            // Compare password failure --> throw error
                            .then((isTheSame) => (isTheSame ? Promise.resolve({ token: JWTController.createToken(user), user }) : Promise.reject(new LoginException())))
                    );
                }
                //User not exist return exception
                return Promise.reject(new LoginException());
            })
            .catch((_) => Promise.reject(new LoginException()));
    }

    /**
     *
     * Generate hashed password
     *
     * @param plainTextPassword - plain text password
     */
    public generateSaltAndHashPassword(plainTextPassword: string) {
        const saltRounds = 10;
        return bcrypt.genSalt(saltRounds).then((salt) => bcrypt.hash(plainTextPassword, salt));
    }

    public comparePassword(plainTextPassword: string, hashedPassword: string): Promise<Boolean> {
        return bcrypt.compare(plainTextPassword, hashedPassword);
    }
}
