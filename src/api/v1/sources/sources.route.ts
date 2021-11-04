import { SourcesController } from './sources.controller';
import BaseRoute from '../../../framework/base.route';
import { Request, Response, NextFunction, Router } from 'express';

export class SourcesRouter extends BaseRoute<SourcesController> {

    protected initializeRoutes() {

        this.router.post('/getAll', (request: Request, response: Response, next: NextFunction) => this.controller.search(request,response,next));
    }

    protected getController(): SourcesController {
        return new SourcesController();
    }
}
