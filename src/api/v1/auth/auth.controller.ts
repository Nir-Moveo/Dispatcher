import { Request, Response, NextFunction } from 'express';
import BaseController from '../../../framework/base.controller';
import AuthHandler from './auth.handler';
import * as _ from 'lodash';
import { LoginResponseDTO } from './Auth.dto';

export default class AuthController extends BaseController<AuthHandler> {
    getHandler(): AuthHandler {
        return new AuthHandler();
    }

    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const email = request.body.username;
            const password = request.body.password;
            const result = await this.handler.login(email, password);
            const user = _.pick(result.user, LoginResponseDTO);
            return response.json({ ...result, user });
        } catch (error) {
            next(error);
        }
    }

    async register(request: Request, response: Response, next: NextFunction) {
        try {
            const user = request.body;
            await this.handler.register(user);
            return response.status(201).json();
        } catch (error) {
            next(error);
        }
    }
}
