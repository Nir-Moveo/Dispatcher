import BaseHandler from '../../../framework/base.handler';
import NewsAPI from 'ts-newsapi';
import  config  from '../../../../config/config';

export class EverythingHandler extends BaseHandler<any> {
  public newsapi= new NewsAPI(config.newsAPI.apiKey);
  getModel(){
  }
  async getEverything(param?: any){ 
    const res= await this.newsapi.getEverything(param);
    return res;
  }
   
}
