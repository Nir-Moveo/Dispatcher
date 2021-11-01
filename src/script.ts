import { EverythingHandler } from './api/v1/everything/everything.handler';
import NewsAPI from 'ts-newsapi';
import { SourcesHandler } from './api/v1/sources/sources.handler';
import { TopHeadlinesHandler } from './api/v1/top-headlines/top-headlines.handler';
import * as _ from 'lodash';
import { ApiNewsCategory, ApiNewsCountry, ApiNewsLanguage, INewsApiArticle, INewsApiEverythingParams, INewsApiSource, INewsApiSourceItem } from 'ts-newsapi/lib/types';


// new interface to add varubals to article schema
interface INewArticle extends INewsApiSource{

  language?:ApiNewsLanguage;

  country?:ApiNewsCountry;

  category?:ApiNewsCategory;
}

const newsapi= new NewsAPI(process.env.NEWS_API_KEY);

class Api {
  /**
   * the function add data from original source item to arctical new item
   * @param from - original source
   * @param to - new interfacr of source (include: language, category and country)
   */
  compare(from:INewsApiSourceItem,to:INewArticle){
    to.language = from.language;
    to.category = from.category;
    to.country = from.country;
  }

  async getData(){
    //get all sources from news Api
    const ApiSources= await newsapi.getSources();

    const sourcesHandler = new SourcesHandler;
    const everyThingHandler = new EverythingHandler;
    const topHeadlinesHandler= new TopHeadlinesHandler;

    //add sourced form Api to DB
    sourcesHandler.upsertMany("id",ApiSources.sources);

    //create sources id array
    const sourceDic= _.mapKeys(ApiSources.sources,"id");
    const surcesID= Object.keys(sourceDic);

    //create filters params for Api request
    const params :INewsApiEverythingParams ={
      sources:surcesID,
      pageSize:100
    };
    

    // get all arcticals of everything and top-headlines 
    await Promise.all([   

      // get all everything arcticles from Api
      newsapi.getEverything(params).then((res)=>{
          return res.articles.map((res)=>{
            const everyting :INewArticle= res.source
            this.compare(sourceDic[`${res.source.id}`],everyting)
         return res;
       })  
     }).then((result)=>{

     // add all everything arcticles from Api to DB
      everyThingHandler.upsertMany("url",result);
    }).catch((err)=>{
       console.log(err);     
     }),

      // get all top-headline arcticles from Api
     newsapi.getTopHeadlines(params).then((res)=>{
      return res.articles.map((res)=>{
        const top:INewArticle= res.source
        this.compare(sourceDic[`${res.source.id}`],top)
        return res;
     })
   }).then((result)=>{
     // add all top-headline arcticles from Api to DB
     topHeadlinesHandler.upsertMany("url",result);
     }).catch((err)=>{
     console.log(err);     
   })
    ]);
  }
}

export default Api;