import * as request from 'supertest';
import App from '../../../app';
import { Types } from 'mongoose';
import * as _ from 'lodash';
import EverythingModel from './everything.model';
import { IQueryRequest } from '../../../framework/db/query-builder';
import { EverythingSchema } from './everything.schema';

const AppTest = new App(3000).app;
const everythingModel = new EverythingModel();

describe('Everything api', () => {

  beforeEach(async ()=>{

    const everything1 = new Types.ObjectId();
    const everything2 = new Types.ObjectId();
    const everything3 = new Types.ObjectId();
    const everything4 = new Types.ObjectId();


    const everythingLeads = [
        {
            _id: everything1,
            url: "https://www.cnn.com/2021/11/02/investing/premarket-stocks-trading/index.html",
            author: "Julia Horowitz, CNN Business",
            content: "A version of this story first appeared in CNN Business' Before the Bell newsletter. Not a subscriber? You can sign up right here. You can listen to an audio version of the newsletter by clicking the … [+7007 chars]",
            createdAt: "2021-11-02T12:54:43.903Z",            
            publishedAt: "2021-11-03T10:23:47.000+00:00",
            source: {
                id: "cnn",
                name: "CNN",
                language: "en",
                category: "business",
                country: "us"
            },
            title: "China is starting to look less scary to investors",
            updatedAt: "2021-11-02T12:54:48.769Z",
            urlToImage: "https://cdn.cnn.com/cnnnext/dam/assets/211102075453-alibaba-headquarters-file-restricted-super-tease.jpg"

        },
        {
          _id: everything2,
          url: "https://www.news24.com/news24/SouthAfrica/News/babita-deokaran-zweli-mkhize-shocked-saddened-to-learn-his-name-was-dragged-into-callous-crime-20211103",
          author: "Canny Maphanga",
          content: "<ul><li>Mkhize said he had \"absolutely nothing\" to do with the crime.</li><li>Deokaran was shot dead while sitting in her car outside her home in Winchester Hills on 23 August.</li><li>The bail appli… [+1879 chars]",
          createdAt: "2021-11-03T08:40:59.569Z",
          description: "Former Health Minister Zweli Mkhize says he is shocked and saddened to learn that his name was dragged into the case against six men alleged to have killed Gauteng health department whistleblower Babita Deokaran.",
          publishedAt: "2021-11-03T08:21:18.000Z",
          source: {
              id: "news24",
              name: "News24",
              language: "en",
              category: "general",
              country: "za"
          },
          title: "News24.com | Babita Deokaran: Zweli Mkhize 'shocked, saddened' to learn his name was dragged into 'callous crime'",
          updatedAt: "2021-11-03T08:40:59.569Z",
          urlToImage: "https://cdn.24.co.za/files/Cms/General/d/10513/230743f9e16e4feeab33f67c38561fa2.jpg"
      },
      {
        _id: everything3,
        url: "https://www.spiegel.de/wirtschaft/tuerkei-inflation-steigt-auf-knapp-20-prozent-a-24389026-b1a3-4e45-bdc8-a67b23025ff9",
        author: "DER SPIEGEL",
        content: "cnn Bereits im September lag die Inflationsrate in der Türkei bei 19,6 Prozent. Nun ist der Wert auf 19,9 Prozent angestiegen. Das teilte das nationale Statistikamt in Ankara mit. Analysten hatten im Sch… [+1234 chars]",
        createdAt: "2021-11-03T09:36:21.807Z",
        description: "Höhere Preise, unsichere Märkte, Währung auf Rekordtiefstand: Der Druck auf die türkische Wirtschaft steigt weiter. Kritiker machen Präsident Erdoğan und seinen geldpolitischen Kurs für die Krise verantwortlich.",
        publishedAt: "2021-11-03T12:22:22.000Z",
        source: {
            id: "cnn",
            name: "CNN",
            language: "de",
            category: "general",
            country: "de"
        },
        title: "Türkei: Inflation steigt auf knapp 20 Prozent",
        updatedAt: "2021-11-03T09:44:39.729Z",
        urlToImage: "https://cdn.prod.www.spiegel.de/images/858ecb57-0001-0004-0000-000001331253_w1280_r1.77_fpx33.34_fpy50.jpg"
    },
    {
      _id: everything4,
      url: "https://lenta.ru/news/2021/11/03/nine/",
      author: "Варвара Кошечкина",
      content: ", . CNN.\r\n , 55- . , , , . , 12 .\r\n« . , », . , , .\r\n , , «»( ), . , 15 . - .",
      createdAt: "2021-11-03T10:03:57.111Z",
      description: "Афганец Абдул Малик продал двух своих дочерей, чтобы достать семье пропитание. Малик выдал замуж девятилетнюю дочь по имени Парвана за 55-летнего мужчину. До этого он продал старшую дочь, которой было 12 лет. Практика продажи женщин приобретает широкие охваты…",
      publishedAt: "2021-11-03T09:51:07.000Z",
      source: {
          id: "lenta",
          name: "Lenta",
          language: "ru",
          category: "general",
          country: "ru"
      },
      title: "Родители продали девятилетнюю афганку ради пропитания",
      updatedAt: "2021-11-03T10:07:49.658Z",
      urlToImage: "https://icdn.lenta.ru/images/2021/11/03/12/20211103124618238/share_db48ae589c18e55c33b3b0ba43e06acd.jpg"
  }
    ];
    await everythingModel.insertMany(everythingLeads);
  },30000);

  afterAll(async ()=>{
   await everythingModel.deleteMany({});
  },30000)

  
    test('get all articales from everything, test the filter search  ', async () => {
      const query : IQueryRequest= {
        search: "cnn",
        skip: 0,
        limit: 10,
    }

        await request(AppTest)
            .post(`/api/v1/everything/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;              
                expect(data.length).toBe(3);

                expect(data[0].source.language).toMatch('en');
                expect(data[1].source.language).toMatch('de');
            });
    });
    test('get all articales from everything, test the filter lenguage  ', async () => {
      const query : IQueryRequest= {
        filter:{
          "source.language" :["en"]
        },
        skip: 0,
        limit: 10,
    }

        await request(AppTest)
            .post(`/api/v1/everything/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;              
                expect(data.length).toBe(2);
               
                 expect(data[0].source.id).toMatch('cnn');
                 expect(data[1].source.id).toMatch('news24');
            });
    });

    test('get all articales from everything, test the filter category  ', async () => {
      const query : IQueryRequest= {
        filter:{
          "source.category" :["general"]
        },
        skip: 0,
        limit: 10,
    }

        await request(AppTest)
            .post(`/api/v1/everything/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;
                expect(data.length).toBe(3);
               
                 expect(data[0].source.id).toMatch('news24');
                 expect(data[1].source.id).toMatch('cnn');
                 expect(data[2].source.id).toMatch('lenta');

            });
    });

    test('get all articales from everything, test the filter country  ', async () => {
      const props = Object.keys(EverythingSchema.schema.paths);
      const query : IQueryRequest= {
        filter:{
          "source.country" :["us"]
        },
        skip: 0,
        limit: 10,
    }

        await request(AppTest)
            .post(`/api/v1/everything/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;
                expect(data.length).toBe(1);
               
                 expect(data[0].source.id).toMatch('cnn');

            });
    });

    test('get all articales from everything, test the From/To filter ', async () => {
      const query : IQueryRequest= {
        from:"2021-11-03T09:30:07.000Z",
        to:"2021-11-03T12:51:07.000Z",
        skip: 0,
        limit: 10,
    }

        await request(AppTest)
            .post(`/api/v1/everything/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;
              
                expect(data.length).toBe(3);
               
                 expect(data[0].source.id).toMatch('cnn');
                 expect(data[2].source.id).toMatch('lenta');

            });
    });


    test('get all articales from everything, test the sort filter ', async () => {
      const props = Object.keys(EverythingSchema.schema.paths);
      const query : IQueryRequest= {
        skip: 0,
        limit: 10,
        sort:{
          "publishedAt":1
        }
    }

        await request(AppTest)
            .post(`/api/v1/everything/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;
              console.log(data);
              
                expect(data.length).toBe(4);
               
                 expect(data[0].source.id).toMatch('news24');
                 expect(data[1].source.id).toMatch('lenta');
                 expect(data[2].source.id).toMatch('cnn');
                 expect(data[3].source.id).toMatch('cnn');

            });
    });

    test('get all articales from everything, test the skip/limit filter ', async () => {
      const props = Object.keys(EverythingSchema.schema.paths);
      const query : IQueryRequest= {
        skip: 2,
        limit: 2,
    }

        await request(AppTest)
            .post(`/api/v1/everything/getAll`)
            .send(query)
            .expect(200)
            .then((res) => {
              const data = res.body.data;
              console.log(data);
              
                expect(data.length).toBe(2);
               
                 expect(data[0].source.id).toMatch('cnn');
                 expect(data[1].source.id).toMatch('lenta');


            });
    });
    test('get all sources from everything', async () => {

      await request(AppTest)
      .post(`/api/v1/everything/getSources`)
      .expect(200)
      .then((res)=>{
        const data = res.body;   

        expect(data.length).toBe(3);
        expect(data[0].count).toBe(2)

      })
    });

    test('get all languages from everything', async () => {

      await request(AppTest)
      .post(`/api/v1/everything/getLanguages`)
      .expect(200)
      .then((res)=>{
        const data = res.body;   

        expect(data.length).toBe(3);
        expect(data[0].count).toBe(2);
        
      })
    });

    test('get all countries from everything', async () => {

      await request(AppTest)
      .post(`/api/v1/everything/getCountries`)
      .expect(200)
      .then((res)=>{
        const data = res.body;   

        expect(data.length).toBe(4);
        expect(data[0].country).toMatch("ru");
        
      })
    });

    test('get statisticts from everything of sources', async () => {

      await request(AppTest)
      .post(`/api/v1/everything/getSourcesStatistics`)
      .expect(200)
      .then((res)=>{
        const data = res.body;   
        console.log(data);
        
        expect(data.length).toBe(3);
        expect(data[0].name).toMatch("CNN");
        expect(data[1].percent).toMatch("25.00");
        
      })
    });

    test('get statisticts from everything by dates', async () => {

      await request(AppTest)
      .post(`/api/v1/everything/getDatesStatistics`)
      .expect(200)
      .then((res)=>{
        const data = res.body;   
        console.log(data);
        
        expect(data.length).toBe(1);
        expect(data[0]._id.week).toBe(44);
        expect(data[0].count).toBe(4);

      })
    });
});