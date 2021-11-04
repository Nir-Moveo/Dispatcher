import { topHeadlinesHandler } from './top-headlines.handler';
import BaseController from '../../../framework/base.controller';
import { NextFunction, Response, Request} from 'express';

export class topHeadlinesController extends BaseController<topHeadlinesHandler> {
    
    getHandler(): topHeadlinesHandler {
        return new topHeadlinesHandler();
    }

}
