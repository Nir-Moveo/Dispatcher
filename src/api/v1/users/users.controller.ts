import { UsersHandler } from './users.handler';
import BaseController from '../../../framework/base.controller';

export class UsersController extends BaseController<UsersHandler> {
    getHandler(): UsersHandler {
        return new UsersHandler();
    }
}
