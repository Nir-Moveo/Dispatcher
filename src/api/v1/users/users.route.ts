import { UpdateUserDTO } from './dto/users.dto';
import { UsersController } from './users.controller';
import BaseRoute from '../../../framework/base.route';
import { Request, Response, NextFunction } from 'express';
import { BaseUserResponse, UserWithIdResponse } from './dto/users.dto';
import validationMiddleware from '../../../middleware/validation.middleware';
import { RegisterRequestDTO } from '../auth/Auth.dto';

export class UsersRouter extends BaseRoute<UsersController> {
    protected initializeRoutes() {
        this.router.get('/', (request: Request, response: Response, next: NextFunction) => this.controller.readAll(request, response, next, UserWithIdResponse));
        this.router.get('/:id', (request: Request, response: Response, next: NextFunction) => this.controller.read(request, response, next, BaseUserResponse));
        this.router.put('/:id', validationMiddleware(UpdateUserDTO, true), (request: Request, response: Response, next: NextFunction) =>
            this.controller.updateById(request, response, next, BaseUserResponse)
        );
        this.router.post('/', validationMiddleware(RegisterRequestDTO, true), (request: Request, response: Response, next: NextFunction) => this.controller.insert(request, response, next));
        this.router.delete('/:id', (request: Request, response: Response, next: NextFunction) => this.controller.deleteById(request, response, next));
    }

    protected getController(): UsersController {
        return new UsersController();
    }
}
