import { EverythingHandler } from './everything.handler';
import BaseController from '../../../framework/base.controller';
import { NextFunction, Response, Request} from 'express';

export class EverythingController extends BaseController<EverythingHandler> {
    
    getHandler(): EverythingHandler {
        return new EverythingHandler();
    }
    async getEveryting(request: Request, response: Response, next: NextFunction){
        const data= request.body;
        const res= await this.handler.getEverything(data);
        response.send(res);
      }
}
