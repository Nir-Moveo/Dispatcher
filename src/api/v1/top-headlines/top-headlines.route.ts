import { topHeadlinesController } from './top-headlines.controller';
import BaseRoute from '../../../framework/base.route';
import { Request, Response, NextFunction, Router } from 'express';

export class topHeadlinesRouter extends BaseRoute<topHeadlinesController> {

    protected initializeRoutes() {
        this.router.get('/', (request: Request, response: Response, next: NextFunction) => this.controller.getTopHeadlines(request,response,next));

    }

    protected getController(): topHeadlinesController {
        return new topHeadlinesController();
    }
}
