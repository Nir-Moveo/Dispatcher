import { SourcesController } from './sources.controller';
import BaseRoute from '../../../framework/base.route';
import { Request, Response, NextFunction, Router } from 'express';

export class SourcesRouter extends BaseRoute<SourcesController> {

    protected initializeRoutes() {
<<<<<<< HEAD
       this.router.post('/getAll', (request: Request, response: Response, next: NextFunction) => this.controller.search(request,response,next));

=======
        this.router.post('/getAll', (request: Request, response: Response, next: NextFunction) => this.controller.search(request,response,next));
>>>>>>> a980e2e7641a1fc946d59a8eb55d9b567f2517ce
    }

    protected getController(): SourcesController {
        return new SourcesController();
    }
}
