import { EverythingController } from './everything.controller';
import BaseRoute from '../../../framework/base.route';
import { Request, Response, NextFunction, Router } from 'express';

export class EverythingRouter extends BaseRoute<EverythingController> {

    protected initializeRoutes() {
      //  this.router.get('/', (request: Request, response: Response, next: NextFunction) => this.controller.getEveryting(request,response,next));

    }

    protected getController(): EverythingController {
        return new EverythingController();
    }
}
