import { EverythingHandler } from './api/v1/everything/everything.handler';
import NewsAPI from 'ts-newsapi';
import { SourcesHandler } from './api/v1/sources/sources.handler';
import { TopHeadlinesHandler } from './api/v1/top-headlines/top-headlines.handler';
import * as _ from 'lodash';
import { ApiNewsLanguage, INewsApiArticle, INewsApiEverythingParams } from 'ts-newsapi/lib/types';

const newsapi= new NewsAPI(process.env.NEWS_API_KEY);
class Api {

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
    const params :INewsApiEverythingParams ={
      sources:sourcesArr,
      pageSize:100
    };
   //const sourcesLanguages= _.uniq(DuplicatedLanguages);

    
    await Promise.all([   
      newsapi.getEverything(params).then((res)=>{
        completeEverything= res.articles.map((everything)=>{
         ApiSources.sources.forEach((source)=>{
           if(source.id==everything.source.id){
             everything.source.language=source.language;
             everything.source.category=source.category;
             everything.source.country=source.country;
           }
         })
         return everything;
       })  
     }).then(()=>{
      everyThingHandler.upsertMany("url",completeEverything);
    }).catch((err)=>{
       console.log(err);     
     }),
     newsapi.getTopHeadlines(params).then((res)=>{
      completeTopHedline= res.articles.map((top)=>{
       ApiSources.sources.forEach((source)=>{
         if(source.id==top.source.id){
           top.source.category=source.category;
           top.source.country=source.country;
           top.source.language=source.language;
         }
       })
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