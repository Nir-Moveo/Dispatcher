import { EverythingController } from './everything.controller';
import BaseRoute from '../../../framework/base.route';
import { Request, Response, NextFunction, Router } from 'express';

export class EverythingRouter extends BaseRoute<EverythingController> {

    protected initializeRoutes() {
        this.router.post('/getAll', (request: Request, response: Response, next: NextFunction) => this.controller.search(request,response,next));
        this.router.post('/getCategories',(request: Request, response: Response, next: NextFunction) => this.controller.getCategories(request,response,next));
        this.router.post('/getCountries',(request: Request, response: Response, next: NextFunction) => this.controller.getCountries(request,response,next));
        this.router.post('/getLanguages',(request: Request, response: Response, next: NextFunction) => this.controller.getLanguages(request,response,next));
        this.router.post('/getSources',(request: Request, response: Response, next: NextFunction) => this.controller.getSources(request,response,next));
    }

    protected getController(): EverythingController {
        return new EverythingController();
    }
}
