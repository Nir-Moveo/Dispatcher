import { EverythingHandler } from './api/v1/everything/everything.handler';
import NewsAPI from 'ts-newsapi';
import { SourcesHandler } from './api/v1/sources/sources.handler';
import { TopHeadlinesHandler } from './api/v1/top-headlines/top-headlines.handler';
import * as _ from 'lodash';
import { ApiNewsLanguage } from 'ts-newsapi/lib/types';

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
    ApiSources.sources.forEach((source)=>{
      sourcesArr.push(source.id)
      DuplicatedLanguages.push(source.language);
    });
    const params ={
      sources:sourcesArr
    };
   const sourcesLanguages= _.uniq(DuplicatedLanguages);
    const temp= newsapi.getEverything({language:'en'}).then((r)=>{
      console.log(r);
      
    }).catch((err)=>{
      console.log(err);
      
    });
    await Promise.all([   
        newsapi.getEverything(params).then((res)=>{
            everyThingHandler.upsertMany("url",res.articles);
        }),
        newsapi.getTopHeadlines(params).then((res)=>{
            topHeadlinesHandler.upsertMany("url",res.articles);
          })
    ]);
  }
}

export default Api;