import App from './app';
import { MongoManager } from './db/mongoose-init'; // apply connection
import   Api   from "./script";

const api= new Api();
api.getData();
MongoManager.connect();
const port = process.env.PORT || 3000;
const app = new App(port);
app.listen();

