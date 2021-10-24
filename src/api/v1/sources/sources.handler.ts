import BaseHandler from '../../../framework/base.handler';
import NewsAPI from 'ts-newsapi';
import config from '../../../../config/config';

export class SourcesHandler extends BaseHandler<any> {
  public newsapi= new NewsAPI(config.newsAPI.apiKey);
  getModel(){
  }
  async getSources(param?: any){ 
    const res= await this.newsapi.getSources(param);
    return res;
  }
   
}
