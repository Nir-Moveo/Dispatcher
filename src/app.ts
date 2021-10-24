import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import ApiRoutes from './api/routes';
import errorMiddleware from './middleware/error.middleware';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { rateLimiterMiddleware } from './middleware/rateLimiter.middleware';
import { Request, Response, NextFunction } from 'express';
import * as hpp from 'hpp';
import { Sanitizer } from './middleware/sanitize';

const allowlist = [process.env.CLIENT_URL, process.env.CLIENT_URL2];
class App {
    public app: express.Application;
    public port: number;

    constructor(port: any) {
        this.app = express();
        this.port = port;
        this.initAppUsage();
    }

    private initAppUsage() {
        this.initializeCors();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    initializeCors() {
        if (process.env.NODE_ENV === 'production') {
            console.log('Prod');
            const corsOptionsDelegate = (req: any, callback: any) => {
                let isDomainAllowed = allowlist.indexOf(req.header('Origin')) !== -1;
                const corsOptions = { origin: isDomainAllowed };
                callback(null, corsOptions);
            };
            this.app.use(cors(corsOptionsDelegate));
            return;
        }
        console.log('not prod');
        this.app.use(cors());
    }

    private initializeMiddlewares() {
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(rateLimiterMiddleware);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(hpp());
        this.app.use('*', Sanitizer);
        this.app.use(helmet.frameguard({ action: 'deny' }));


        this.app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
            if (process.env.NODE_ENV !== 'production') {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                return next();
            }

            res.header('Access-Control-Allow-Origin', ...allowlist);
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            return next();
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeRoutes() {
        const apiRoutes = new ApiRoutes();
        if (process.env.NODE_ENV !== 'production') {
            this.app.use('/api', express.static(__dirname + '../../webApidoc'));
        }
        this.app.use('/api', apiRoutes.router);
        this.app.get('/api/health', (request: Request, response: Response, next: NextFunction) => {
            response.status(200).json({
                massage:'ok'
            });

        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}


export default App;
