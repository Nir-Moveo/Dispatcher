import { Router } from 'express';
import BaseController from './base.controller';

abstract class BaseRoute<Controller extends BaseController<any>> {
    public router = Router();
    protected controller: Controller;

    constructor() {
        this.controller = this.getController();
        this.initializeRoutes();
    }

    protected abstract initializeRoutes(): void;
    protected abstract getController(): Controller;
}

export default BaseRoute;
