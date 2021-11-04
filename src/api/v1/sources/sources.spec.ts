import * as request from 'supertest';
import App from '../../../app';
import { Types } from 'mongoose';
import * as _ from 'lodash';
import SourceModel from './sources.model';
import { IQueryRequest } from '../../../framework/db/query-builder';


const AppTest = new App(3000).app;
const sourceModel = new SourceModel();

describe('Source api', () => {

  beforeEach(async ()=>{

    const source1 = new Types.ObjectId();
    const source2 = new Types.ObjectId();
    const source3 = new Types.ObjectId();
    const source4 = new Types.ObjectId();


    const sourceLeads = [
        {
            _id: source1,
            id: "abc-news",
            category: "general",
            country: "us",
            createdAt: "2021-11-03T14:59:28.899Z",
            description: "Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.",
            language: "en",
            name: "ABC News",
            updatedAt: "2021-11-04T10:13:29.838Z",
            url: "https://abcnews.go.com"

        },
        {
          _id: source2,
          id: "aftenposten",
          category: "general",
          country: "no",
          createdAt: "2021-11-03T14:59:28.899Z",
          description: "Norges ledende nettavis med alltid oppdaterte nyheter innenfor innenriks,headlines, utenriks, sport og kultur.",
          language: "no",
          name: "Aftenposten",
          updatedAt: "2021-11-04T10:13:29.838Z",
          url: "https://www.aftenposten.no"
      },
      {
        _id: source3,
        id: "australian-financial-review",
        category: "business",
        country: "au",
        createdAt: "2021-11-03T14:59:28.899Z",
        description: "The Australian Financial Review reports the latest news from business, finance, investment and politics, updated in real time. It has a reputation for independent, award-winning journalism and is essential reading for the business and investor community.",
        language: "en",
        name: "Australian Financial Review",
        updatedAt: "2021-11-04T10:13:29.838Z",
        url: "http://www.afr.com"
    },
    {
      _id: source4,
      id: "entertainment-weekly",
      category: "entertainment",
      country: "us",
      createdAt: "2021-11-03T14:59:28.899Z",
      description: "Online version of the print magazine includes entertainment news, interviews, reviews of music, film, TV and books, and a special area for magazine subscribers.",
      language: "en",
      name: "Entertainment Weekly",
      updatedAt: "2021-11-04T10:13:29.838Z",
      url: "http://www.ew.com"
  }
    ];
    await sourceModel.insertMany(sourceLeads);
  },30000);

  afterAll(async ()=>{
   await sourceModel.deleteMany({});
  },30000)

  
    test('get all sources test the filter search  ', async () => {
      const query : IQueryRequest= {
        search: "headlines",
        skip: 0,
        limit: 10,
    }

        await request(AppTest)
            .post(`/api/v1/sources/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;              
                expect(data.length).toBe(2);

                expect(data[0].language).toMatch('en');
                expect(data[1].language).toMatch('no');
            });
    });
    test('get all sources test the filter lenguage  ', async () => {
      const query : IQueryRequest= {
        filter:{
          "language" :["en"]
        },
        skip: 0,
        limit: 10,
    }

        await request(AppTest)
            .post(`/api/v1/sources/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;              
                expect(data.length).toBe(3);
               
                 expect(data[0].id).toMatch('abc-news');
                 expect(data[1].id).toMatch('australian-financial-review');
                 expect(data[2].id).toMatch('entertainment-weekly');

            });
    });

    test('get all sources test thethe filter category  ', async () => {
      const query : IQueryRequest= {
        filter:{
          "category" :["general"]
        },
        skip: 0,
        limit: 10,
    }

        await request(AppTest)
            .post(`/api/v1/sources/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;
                expect(data.length).toBe(2);
               
                 expect(data[0].id).toMatch('abc-news');
                 expect(data[1].id).toMatch('aftenposten');

            });
    });

    test('get all sources test the filter country  ', async () => {
      const query : IQueryRequest= {
        filter:{
          "country" :["us"]
        },
        skip: 0,
        limit: 10,
    }

        await request(AppTest)
            .post(`/api/v1/sources/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;
                expect(data.length).toBe(2);
               
                 expect(data[0].id).toMatch('abc-news');

            });
    });



    test('get all sources test the sort filter ', async () => {
      const query : IQueryRequest= {
        skip: 0,
        limit: 10,
        sort:{
          "name":1
        }
    }

        await request(AppTest)
            .post(`/api/v1/sources/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;
              
                expect(data.length).toBe(4);
               
                 expect(data[0].id).toMatch('abc-news');
                 expect(data[1].id).toMatch('aftenposten');
                 expect(data[2].id).toMatch('australian-financial-review');
                 expect(data[3].id).toMatch('entertainment-weekly');

            });
    });

    test('get all sources test the skip/limit filter ', async () => {
      const query : IQueryRequest= {
        skip: 2,
        limit: 2,
    }

        await request(AppTest)
            .post(`/api/v1/sources/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;
              
                expect(data.length).toBe(2);
               
                 expect(data[0].id).toMatch('australian-financial-review');
                 expect(data[1].id).toMatch('entertainment-weekly');


            });
    });
  });