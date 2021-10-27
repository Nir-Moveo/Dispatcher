import { accessibleRecordsPlugin } from '@casl/mongoose';
import * as mongoose from 'mongoose';

mongoose.set('useUnifiedTopology', true);

export class MongoManager {
    public static connect() {
        //If db already connected
       console.log('Db connection status: ', mongoose.connection.readyState);
       if (mongoose.connection.readyState == 1 || mongoose.connection.readyState == 2) return;
        const connection = process.env.MONGODB_URL;        
        mongoose.connect(connection, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        }); // connect to db

        const con = mongoose.connection;

        con.on('error', (err) => {
            console.error('connection error:', err);
        }).once('open', async () => {
            console.log('DB connection success!');
        });
    }

    public static async disconnect() {
        return await mongoose.connection.close();
    }
}
