import BaseHandler from '../../../framework/base.handler';
import topHeadlinesModel from './top-headlines.model';

export class topHeadlinesHandler extends BaseHandler<any> {
  getModel(){
    return new topHeadlinesModel
  }
   
}
