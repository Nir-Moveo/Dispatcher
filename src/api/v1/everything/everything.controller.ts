import { EverythingHandler } from './everything.handler';
import BaseController from '../../../framework/base.controller';
import { NextFunction, Response, Request} from 'express';

export class EverythingController extends BaseController<EverythingHandler> {
    
    getHandler(): EverythingHandler {
        return new EverythingHandler();
    }

}
