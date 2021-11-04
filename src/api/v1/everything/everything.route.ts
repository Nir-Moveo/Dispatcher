import { EverythingController } from './everything.controller';
import BaseRoute from '../../../framework/base.route';
import { Request, Response, NextFunction, Router } from 'express';

export class EverythingRouter extends BaseRoute<EverythingController> {

    protected initializeRoutes() {
        this.router.post('/getAll', (request: Request, response: Response, next: NextFunction) => this.controller.search(request,response,next));
        this.router.post('/getCategories',(request: Request, response: Response, next: NextFunction) => this.controller.getDropdown(request,response,next,"category"));
        this.router.post('/getCountries',(request: Request, response: Response, next: NextFunction) => this.controller.getDropdown(request,response,next,"country"));
        this.router.post('/getLanguages',(request: Request, response: Response, next: NextFunction) => this.controller.getDropdown(request,response,next,"language"));
        this.router.post('/getSources',(request: Request, response: Response, next: NextFunction) => this.controller.getDropdown(request,response,next,"name"));
        this.router.post('/getSourcesStatistics',(request: Request, response: Response, next: NextFunction) => this.controller.getSourceStatistics(request,response,next));
        this.router.post('/getDatesStatistics',(request: Request, response: Response, next: NextFunction) => this.controller.getDatesStatistics(request,response,next));

        
    }

    protected getController(): EverythingController {
        return new EverythingController();
    }
}
