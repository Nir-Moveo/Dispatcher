import BaseHandler from '../../../framework/base.handler';
import SourceModel from './sources.model';

export class SourcesHandler extends BaseHandler<any> {
  getModel(){
    return new SourceModel;
  }  
}
