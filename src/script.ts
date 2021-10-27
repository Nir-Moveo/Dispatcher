import { EverythingHandler } from './api/v1/everything/everything.handler';
import NewsAPI from 'ts-newsapi';
import { SourcesHandler } from './api/v1/sources/sources.handler';
import { TopHeadlinesHandler } from './api/v1/top-headlines/top-headlines.handler';
import * as _ from 'lodash';
import { ApiNewsLanguage, INewsApiArticle, INewsApiEverythingParams, INewsApiSourceItem } from 'ts-newsapi/lib/types';

const newsapi= new NewsAPI(process.env.NEWS_API_KEY);
class Api {
  public static compare(from:INewsApiSourceItem,to:INewsApiArticle){
    to.source.language = from.language;
    to.source.category = from.category;
    to.source.country = from.country;
  }

  public static async getData(){
    const ApiSources= await newsapi.getSources();
    const sourcesHandler = new SourcesHandler;
    const everyThingHandler = new EverythingHandler;
    const topHeadlinesHandler= new TopHeadlinesHandler;
    sourcesHandler.upsertMany("id",ApiSources.sources);
    let sourcesArr:string[] = [];
    let DuplicatedLanguages:ApiNewsLanguage[]=[];
    let completeEverything:INewsApiArticle[]=[];
    let completeTopHedline:INewsApiArticle[]=[];
    ApiSources.sources.forEach((source)=>{
      sourcesArr.push(source.id)
      DuplicatedLanguages.push(source.language);
    });
    const sourceDic= _.mapKeys(ApiSources.sources,"id");
    const params :INewsApiEverythingParams ={
      sources:sourcesArr,
      pageSize:100
    };
    
    await Promise.all([   
      newsapi.getEverything(params).then((res)=>{
          completeEverything= res.articles.map((everything)=>{
            this.compare(sourceDic[`${everything.source.id}`],everything)
         return everything;
       })  
     }).then(()=>{
      everyThingHandler.upsertMany("url",completeEverything);
    }).catch((err)=>{
       console.log(err);     
     }),
     newsapi.getTopHeadlines(params).then((res)=>{
      completeTopHedline= res.articles.map((top)=>{
        this.compare(sourceDic[`${top.source.id}`],top)
        return top;
     })
   }).then(()=>{
       topHeadlinesHandler.upsertMany("url",completeTopHedline);
     }).catch((err)=>{
     console.log(err);     
   })
    ]);
  }
}

export default Api;