import { SourcesHandler } from './sources.handler';
import BaseController from '../../../framework/base.controller';
import { NextFunction, Response, Request} from 'express';

export class SourcesController extends BaseController<SourcesHandler> {
    
    getHandler(): SourcesHandler {
        return new SourcesHandler();
    }
    async getSources(request: Request, response: Response, next: NextFunction){
        const data= request.body;
        const res= await this.handler.getSources(data);
        response.send(res);
      }
}
