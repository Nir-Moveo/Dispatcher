import { IUser } from '../../users/users.schema';
/**
 *
 * Welcome to the JWT (Json Web Tokens)
 *
 * In order to use this module you need to accomplish to the following task:
 * 1. npm install jsonwebtoken --save
 * 2. npm install bcryptjs --save
 * 3. create a complex key that should be saved in the config file
 *
 * several notes:
 * 1. When sending the token it should be on the authorization section under the bearer key
 * 2. Once the a user is being verified his token, you should save it to res.locals.userID and check if the verified user has the right permissions to do the current query.
 * 3. if you gets an error from the verified function you should send special error code to the client like: res.status(401).json('Failed to authenticate token.');
 */

import { sign, verify } from 'jsonwebtoken';
import * as _ from 'lodash';
import { InvalidTokenException } from '../../../../exceptions';
import { UserWithIdResponse } from '../../users/dto/users.dto';

export class JWTController {
    public static readonly forToken: string = process.env.TOKEN_KEY || 'thisisdevpassword';
    private static readonly expirationDuration: string = '24h';

    /**
     * Create a token from a user Id.
     *
     * @static
     * @param {*} user
     * @returns {string}
     * @memberof JWTController
     */
    public static createToken(rawUser: IUser, expirationDuration: string = this.expirationDuration, tokenPass: string = this.forToken): string {
        const user = _.pick(rawUser, UserWithIdResponse);
        var token = sign({ user: { ...user } }, tokenPass, {
            expiresIn: this.expirationDuration
        });

        return token;
    }

    /**
     * Verify received token.
     *
     * @static
     * @param {string} token
     * @returns {(Promise<{id: string}>)}
     * @memberof JWTController
     */
    public static async verifyToken(token: string): Promise<string | object> {
        try {
            return verify(token, this.forToken);
        } catch (err) {
            throw new InvalidTokenException();
        }
    }

    /**
     *Remove the Bearer from  header token
     *
     * @static
     * @param {string} authHeader
     * @returns {string}
     * @memberof JWTController
     */
    public static cleanReceivedToken(authHeader: string): string {
        let token;
        if (authHeader && authHeader.includes('Bearer ')) {
            token = authHeader.substring(7, authHeader.length);
        }
        return token;
    }
}
