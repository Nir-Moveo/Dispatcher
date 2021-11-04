import { EverythingHandler } from './api/v1/everything/everything.handler';
import NewsAPI from 'ts-newsapi';
import { SourcesHandler } from './api/v1/sources/sources.handler';
import { topHeadlinesHandler } from './api/v1/top-headlines/top-headlines.handler';
import * as _ from 'lodash';
import { ApiNewsCategory, ApiNewsCountry, ApiNewsLanguage, INewsApiArticle, INewsApiEverythingParams, INewsApiSource, INewsApiSourceItem } from 'ts-newsapi/lib/types';
import * as moment from 'moment';

// new interface to add varubals to article schema
interface INewArticleSource extends INewsApiSource{

  language?:ApiNewsLanguage;

  country?:ApiNewsCountry;

  category?:ApiNewsCategory;

}

interface INewArticle {
    /**
     * The identifier id and a display name.
     */
     source: INewArticleSource;
     /**
      * The author of the article.
      */
     author: string | null;
     /**
      * The headline or title of the article.
      */
     title: string;
     /**
      * A description or snippet from the article.
      */
     description: string | null;
     /**
      * The direct URL to the article.
      */
     url: string;
     /**
      * The URL to a relevant image for the article.
      */
     urlToImage: string | null;
     /**
      * The date and time that the article was published, in UTC (+000)
      */
     publishedAt: Date;
     /**
      * The unformatted content of the article, where available. This is truncated to 200 chars.
      */
     content: string | null;
}


const newsapi= new NewsAPI(process.env.NEWS_API_KEY);

class Api {
  /**
   * the function add data from original source item to arctical new item
   * @param from - original source
   * @param to - new interfacr of source (include: language, category and country)
   */
  compare(from:INewsApiSourceItem,to:INewArticleSource):INewArticleSource{
    to.language = from.language;
    to.category = from.category;
    to.country = from.country;
    return to;
  }

  async getData(){
    //get all sources from news Api
    const ApiSources= await newsapi.getSources();

    const sourcesHandler = new SourcesHandler;
    const everyThingHandler = new EverythingHandler;
    const topHeadlineHandler= new topHeadlinesHandler;

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
        const allNewArticles :INewArticle[] = res.articles.map((article)=>{
          return {
            ...article,
            publishedAt:moment(article.publishedAt).toDate(),
            source:this.compare(sourceDic[`${article.source.id}`],article.source)
          }
        })
         return allNewArticles;
       }).then((result)=>{

     // add all everything arcticles from Api to DB
      everyThingHandler.upsertMany("url",result);
    }).catch((err)=>{
       console.log(err);     
     }),

      // get all top-headline arcticles from Api
      newsapi.getTopHeadlines(params).then((response)=>{
        const allNeArticles :INewArticle[] = response.articles.map((art)=>{
          return {
            ...art,
            publishedAt:moment(art.publishedAt).toDate(),
            source:this.compare(sourceDic[`${art.source.id}`],art.source)
          }
        })        
         return allNeArticles;
   }).then((results)=>{
     const t=0;
     // add all top-headline arcticles from Api to DB
     topHeadlineHandler.upsertMany("url",results);
     }).catch((err)=>{
     console.log(err);     
   })
    ]);
  }
}

export default Api;