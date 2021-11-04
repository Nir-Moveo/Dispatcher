import * as request from 'supertest';
import App from '../../../app';
import { Types } from 'mongoose';
import * as _ from 'lodash';
import topHeadlinesModel from './top-headlines.model';
import { IQueryRequest } from '../../../framework/db/query-builder';
import { topHeadlinesSchema } from './top-headlines.schema';

const AppTest = new App(3000).app;
const topheadlinesModel = new topHeadlinesModel();

describe('Top-Healines api', () => {

  beforeEach(async ()=>{

    const topheadlines1 = new Types.ObjectId();
    const topheadlines2 = new Types.ObjectId();
    const topheadlines3 = new Types.ObjectId();
    const topheadlines4 = new Types.ObjectId();


    const topHeadlinesLeads = [
      {
          _id: topheadlines1,
          url: "http://www.independent.co.uk/news/uk/politics/labour-cyber-attack-members-data-b1950682.html",
          author: "Adam Forrest",
          content: "Labour has revealed that amazon  personal information given by party members and supporters is among data breached in a cyber incident at a firm which helps run its IT systems.\r\nThe opposition said it had be… [+1987 chars]",
          createdAt: "2021-11-03T14:59:29.881Z",
          description: "Personal details among ‘significant quantity’ of data affected",
          publishedAt: "2021-11-03T14:51:23.000Z",
          source: {
              id: "independent",
              name: "Independent",
              language: "en",
              category: "general",
              country: "gb"
          },
          title: "Labour says party members’ data breached in ‘cyber incident’",
          updatedAt: "2021-11-03T14:59:29.881Z",
          urlToImage: "https://static.independent.co.uk/2021/11/03/14/newFile.jpg?width=1200&auto=webp&quality=75"
      },
      {
        _id: topheadlines2,
        url: "https://techcrunch.com/2021/11/03/amazon-launches-a-70-air-quality-monitor-for-alexa/",
        author: "Brian Heater",
        content: "Amazon unloaded a whole slew of new smart home devices back in late September, but a smattering of products are still trickling out ahead of the holidays. Certainly a Smart Air Quality Monitor isnt a… [+1299 chars]",
        createdAt: "2021-11-03T14:59:29.881Z",
        description: "Amazon unloaded a whole slew of new smart home devices back in late September, but a smattering of products are still trickling out ahead of the holidays. Certainly a Smart Air Quality Monitor isn’t as exciting as, say, a giant Echo Show, home robot or even a…",
        publishedAt: "2021-11-03T14:45:51.000Z",
        source: {
            id: "techcrunch",
            name: "TechCrunch",
            language: "en",
            category: "technology",
            country: "us"
        },
        title: "Amazon launches a $70 air quality monitor for Alexa",
        updatedAt: "2021-11-03T14:59:29.881Z",
        urlToImage: "https://techcrunch.com/wp-content/uploads/2021/11/download-5.jpg?w=711"
    },
    {
      _id: topheadlines3,
      url: "http://time.com/6113441/investors-climate-motives/",
      author: "Frank Jordans and Danica Kirka / AP",
      content: "(GLASGOW, Scotland) — Governments and big investors announced fresh steps Wednesday to pour trillions of dollars into curbing global warming, reflecting the financial world’s growing embrace of effor… [+4827 chars]",
      createdAt: "2021-11-03T14:59:29.881Z",
      description: "Governments and big investors announced new steps at COP26 to pour trillions of dollars into curbing global warming.",
      publishedAt: "2021-11-03T14:30:45.000Z",
      source: {
          id: "time",
          name: "Time",
          language: "en",
          category: "general",
          country: "us"
      },
      title: "Investors Bet Big on Climate Fight—But Activists Call for Scrutiny of Their Motives",
      updatedAt: "2021-11-03T14:59:29.881Z",
      urlToImage: "https://api.time.com/wp-content/uploads/2021/11/AP21307315463909.jpg?quality=85&w=1200&h=628&crop=1"
  },
  {
    _id: topheadlines4,
    url: "https://lenta.ru/news/2021/11/03/ne_treba/",
    author: "Lenta",
    content: "« -2» «» , Gazeta Wyborcza . .\r\n « » 30 , «» , . , . « , , , , , , », .\r\nBloomberg . , , , , « -2».\r\n3 Bloomberg , « -2» 2022 - . , , . , 2000 , 3 1000 .",
    createdAt: "2021-11-03T14:59:29.881Z",
    description: "Россия не испытывает нужды в газопроводе «Северный поток-2», об этом свидетельствует сокращение транзита газа в Европу, заявил журналист польской Gazeta Wyborcza Анджей Кублик. Прокачка газа по трубопроводу «Ямал — Европа» 30 октября упала почти до нуля, а с …",
    publishedAt: "2021-11-03T14:00:30.000Z",
    source: {
        id: "lenta",
        name: "Lenta",
        language: "ru",
        category: "general",
        country: "ru"
    },
    title: "В Польше рассказали о доказательствах ненужности «Северного потока-2» России",
    updatedAt: "2021-11-03T14:59:29.881Z",
    urlToImage: "https://icdn.lenta.ru/images/2021/11/03/16/20211103164838117/share_0fa77c1178f1de16f72f8626cf6bebbc.jpg"
}
  ];
  await topheadlinesModel.insertMany(topHeadlinesLeads);
},30000);

afterAll(async ()=>{
 await topheadlinesModel.deleteMany({});
},30000)
  
    test('get all articales from top-headlines, test the filter search  ', async () => {
      const query : IQueryRequest= {
        search: "amazon",
        skip: 0,
        limit: 10,
    }

        await request(AppTest)
            .post(`/api/v1/top-headlines/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;                            
                expect(data.length).toBe(2);

                expect(data[0].source.id).toMatch('independent');
                expect(data[1].source.id).toMatch('techcrunch');
            });
    });
    test('get all articales from top-headlines, test the filter lenguage  ', async () => {
      const query : IQueryRequest= {
        filter:{
          "source.language" :["en"]
        },
        skip: 0,
        limit: 10,
    }

        await request(AppTest)
            .post(`/api/v1/top-headlines/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;                            
                expect(data.length).toBe(3);
               
                 expect(data[0].source.id).toMatch('independent');
                 expect(data[1].source.id).toMatch('techcrunch');
                 expect(data[2].source.id).toMatch('time');

            });
    });

    test('get all articales from top-headlines, test the filter category  ', async () => {
      const query : IQueryRequest= {
        filter:{
          "source.category" :["general"]
        },
        skip: 0,
        limit: 10,
    }

        await request(AppTest)
            .post(`/api/v1/top-headlines/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;              
                expect(data.length).toBe(3);
               
                 expect(data[0].source.id).toMatch('independent');
                 expect(data[1].source.id).toMatch('time');
                 expect(data[2].source.id).toMatch('lenta');

            });
    });

    test('get all articales from top-headlines, test the filter country  ', async () => {
      const props = Object.keys(topHeadlinesSchema.schema.paths);
      const query : IQueryRequest= {
        filter:{
          "source.country" :["us"]
        },
        skip: 0,
        limit: 10,
    }

        await request(AppTest)
            .post(`/api/v1/top-headlines/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;              
                expect(data.length).toBe(2);
               
                 expect(data[0].source.id).toMatch('techcrunch');
                 expect(data[1].source.id).toMatch('time');

            });
    });

  


    test('get all articales from top-headlines, test the sort filter ', async () => {
      const query : IQueryRequest= {
        skip: 0,
        limit: 10,
        sort:{
          "publishedAt":1
        }
    }

        await request(AppTest)
            .post(`/api/v1/top-headlines/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;              
                expect(data.length).toBe(4);
               
                 expect(data[0].source.id).toMatch('lenta');
                 expect(data[1].source.id).toMatch('time');
                 expect(data[2].source.id).toMatch('techcrunch');
                 expect(data[3].source.id).toMatch('independent');

            });
    });

    test('get all articales from top-headlines, test the skip/limit filter ', async () => {
      const query : IQueryRequest= {
        skip: 2,
        limit: 2,
    }

        await request(AppTest)
            .post(`/api/v1/top-headlines/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;
              
                expect(data.length).toBe(2);
               
                 expect(data[0].source.id).toMatch('time');
                 expect(data[1].source.id).toMatch('lenta');


            });
    });
    test('get all sources from top-headlines', async () => {

      await request(AppTest)
      .post(`/api/v1/top-headlines/getSources`)
      .expect(200)
      .then((res)=>{
        const data = res.body;   

        expect(data.length).toBe(4);

      })
    });

    test('get all languages from top-headlines', async () => {

      await request(AppTest)
      .post(`/api/v1/top-headlines/getLanguages`)
      .expect(200)
      .then((res)=>{
        const data = res.body;   

        expect(data.length).toBe(2);
        expect(data[0].count).toBe(3);
        
      })
    });

    test('get all countries from top-headlines', async () => {

      await request(AppTest)
      .post(`/api/v1/top-headlines/getCountries`)
      .expect(200)
      .then((res)=>{
        const data = res.body;   

        expect(data.length).toBe(3);
        expect(data[0].count).toBe(2);
        expect(data[1].country).toMatch("ru");
      })
    });

    test('get statisticts from top-headlines of sources', async () => {

      await request(AppTest)
      .post(`/api/v1/top-headlines/getSourcesStatistics`)
      .expect(200)
      .then((res)=>{
        const data = res.body;           
        expect(data.length).toBe(4);
        expect(data[0].name).toMatch("Lenta");
        expect(data[1].percent).toMatch("25.00");
        
      })
    });

    test('get statisticts from top-headlines by dates', async () => {

      await request(AppTest)
      .post(`/api/v1/top-headlines/getDatesStatistics`)
      .expect(200)
      .then((res)=>{
        const data = res.body;   
        
        expect(data.length).toBe(1);
        expect(data[0]._id.week).toBe(44);
        expect(data[0].count).toBe(4);

      })
    });
});