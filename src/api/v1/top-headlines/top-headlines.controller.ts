import { TopHeadlinesHandler } from './top-headlines.handler';
import BaseController from '../../../framework/base.controller';
import { NextFunction, Response, Request} from 'express';

export class topHeadlinesController extends BaseController<TopHeadlinesHandler> {
    
    getHandler(): TopHeadlinesHandler {
        return new TopHeadlinesHandler();
    }

}
