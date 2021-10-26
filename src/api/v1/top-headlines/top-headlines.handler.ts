import BaseHandler from '../../../framework/base.handler';
import TopHeadlinesModel from './top-headlines.model';

export class TopHeadlinesHandler extends BaseHandler<any> {
  getModel(){
    return new TopHeadlinesModel
  }
   
}
