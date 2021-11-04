/**
 * @api {post} api/v1/everything/getAll
 * @apiName  getAll
 * @apiGroup Everything
 * @apiVersion 0.1.0
 * @apiParam {String} search Everything keywords or phrases to search for in the article 
 * @apiParam {Date} from Everything A date and optional time for the oldest article allowed
 * @apiParam {Date} to Everything A date and optional time for the newest article allowed
 * @apiParam {String} source.language Everything filter data by languages in array, The 2-letter ISO-639-1 code of the language you want to get headlines for. Possible options: ar de en es fr he it nl no pt ru se ud zh 
 * @apiParam {String} source.country Everything filter data by countries in array, The 2-letter ISO 3166-1 code of the country you want to get headlines for. Possible options: ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za
 * @apiParam {String} source.category Everything filter data by categories in array, The category you want to get headlines for. Possible options: business entertainment general health science sports technology
 * @apiParam {String} sort Everything sort result by every field in data
 * @apiParam {String} skip Everything Use this for paging to result (skips of 10)
 * @apiParam {String} limit Everything The number of results to return per page, 10 is the default

 * @apiParamExample {json} Input
 *    {
 *          "search":"cnn",
 *          "from":"2021-11-02T12:30:26.000Z",
 *          "to":"2021-11-02T12:33:26.000Z",
 *          "filter":{
 *              "source.language":["en"],
 *              "source.country":["us"],
 *              "source.category":["general"]
 *          },
 *          "skip":0,
 *          "limit":10
 *    }
 *
 * @apiSuccess {Array} data Everyting all data result in array
 * @apiSuccess {id} _id Everything the artical id
 * @apiSuccess {String} url Everything artical url
 * @apiSuccess {String} author Everything artical author
 * @apiSuccess {String} content Everything artical content
 * @apiSuccess {String} title Everything artical title
 * @apiSuccess {String} description Everything artical description
 * @apiSuccess {String} publishedAt Everythind artical publish date in yyyy/mm/dd format
 * @apiSuccess {Object} source Everythind artical source
 * @apiSuccess {String} source.id Everythind source name in lower case
 * @apiSuccess {String} source.name Everythind source name in uper case
 * @apiSuccess {String} source.publishDate Everythind artical publish date in Date format
 * @apiSuccess {String} source.language Everythind source language
 * @apiSuccess {String} source.category Everythind source category
 * @apiSuccess {String} source.country Everythind source country
 * @apiSuccess {String} urlToImage Everythind artical url to image
 * @apiSuccess {Number} total Everythind total articals in result
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "data": [
        {
            "_id": "618135148e840c454cfff87c",
            "url": "https://www.cnn.com/2021/11/02/investing/premarket-stocks-trading/index.html",
            "author": "Julia Horowitz, CNN Business",
            "content": "A version of this story first appeared in CNN Business' Before the Bell newsletter. Not a subscriber? You can sign up right here. You can listen to an audio version of the newsletter by clicking the … [+7007 chars]",
            "createdAt": "2021-11-02T12:54:43.903Z",
            "description": "For investors, the appeal of China has always been clear. Despite a long list of political risks, it's the world's second-largest economy — home to a massive pool of consumers and the fastest expansion of the middle class in history.",
            "publishedAt": "2021/11/2",
            "source": {
                "id": "cnn",
                "name": "CNN",
                "publishDate": "2021-11-02T12:33:26.000Z",
                "language": "en",
                "category": "general",
                "country": "us"
            },
            "title": "China is starting to look less scary to investors",
            "updatedAt": "2021-11-02T12:54:48.769Z",
            "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/211102075453-alibaba-headquarters-file-restricted-super-tease.jpg"
        }
    ],
    "total": 1
}
 */




