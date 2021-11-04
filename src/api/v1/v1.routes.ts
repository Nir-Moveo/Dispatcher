import { Router } from 'express';
import { EverythingRouter } from './everything/everything.route';
import { topHeadlinesRouter } from './top-headlines/top-headlines.route';
import { SourcesRouter } from './sources/sources.route';

class V1Routes {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const everythingRouter = new EverythingRouter();
        const topheadlinesRouter = new topHeadlinesRouter();
        const sourcesRouter = new SourcesRouter();

        // Open routes
        this.router.use('/everything', everythingRouter.router);
        this.router.use('/top-headlines',topheadlinesRouter.router);
        this.router.use('/sources',sourcesRouter.router);
        // Authentication route
    }
}
export default V1Routes;
