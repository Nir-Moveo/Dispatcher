import BaseHandler from '../../../framework/base.handler';
import NewsAPI from 'ts-newsapi';
import config from '../../../../config/config';

export class topHeadlinesHandler extends BaseHandler<any> {
  public newsapi= new NewsAPI(config.newsAPI.apiKey);
  getModel(){
  }
  async getTopHeadlines(param?: any){ 
    const res= await this.newsapi.getTopHeadlines(param);
    return res;
  }
   
}
