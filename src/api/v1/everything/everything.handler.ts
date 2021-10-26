import BaseHandler from '../../../framework/base.handler';
import EverythingModel from './everything.model';

export class EverythingHandler extends BaseHandler<any> {
  getModel(){
    return new EverythingModel;
  }

}
