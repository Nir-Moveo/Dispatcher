import { Roles } from './api/v1/users/users.schema';
import App from './app';
import { MongoManager } from './db/mongoose-init'; // apply connection
import   Api   from "./script";

Api.getData();
MongoManager.connect();
const port = process.env.PORT || 3000;
const app = new App(port);
app.listen();

