import { topHeadlinesController } from './top-headlines.controller';
import BaseRoute from '../../../framework/base.route';
import { Request, Response, NextFunction, Router } from 'express';

export class topHeadlinesRouter extends BaseRoute<topHeadlinesController> {

    protected initializeRoutes() {
        this.router.post('/getAll', (request: Request, response: Response, next: NextFunction) => this.controller.search(request,response,next));
        this.router.post('/getCategories',(request: Request, response: Response, next: NextFunction) => this.controller.getCategories(request,response,next));
        this.router.post('/getCountries',(request: Request, response: Response, next: NextFunction) => this.controller.getCountries(request,response,next));
        this.router.post('/getLanguages',(request: Request, response: Response, next: NextFunction) => this.controller.getLanguages(request,response,next));
        this.router.post('/getSources',(request: Request, response: Response, next: NextFunction) => this.controller.getSources(request,response,next));
    }

    protected getController(): topHeadlinesController {
        return new topHeadlinesController();
    }
}
