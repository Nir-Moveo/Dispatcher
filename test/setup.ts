import * as mongoose from 'mongoose';



beforeEach(async () => {
    /*
    If the mongoose connection is closed, 
    start it up using the test url and database name
    provided by the node runtime ENV
    */
    if (mongoose.connection.readyState !== 1) {
        try {
            const dbUniqueName = mongoose.Types.ObjectId().toString();
            await mongoose.connect(process.env.MONGO_URL, {
                dbName: dbUniqueName,
                useCreateIndex: true,
                useFindAndModify: false
            })

        } finally {
            await mongoose.connection.db.dropDatabase()
        }
    } else {
        await mongoose.connection.db.dropDatabase();
    }
});


afterAll(async () => {
    await mongoose.disconnect();
});
