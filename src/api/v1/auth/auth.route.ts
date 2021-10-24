import { Request, Response, NextFunction } from 'express';
import BaseRoute from '../../../framework/base.route';
import AuthController from './auth.controller';
import { LoginRequestDTO, RegisterRequestDTO } from './Auth.dto';
import validationMiddleware from '../../../middleware/validation.middleware';

export default class AuthRoute extends BaseRoute<AuthController> {
    protected initializeRoutes(): void {
        this.router.post('/login', validationMiddleware(LoginRequestDTO), (request: Request, response: Response, next: NextFunction) => this.controller.login(request, response, next));
        this.router.post('/register', validationMiddleware(RegisterRequestDTO), (request: Request, response: Response, next: NextFunction) => this.controller.register(request, response, next));
    }

    protected getController(): AuthController {
        return new AuthController();
    }
}
