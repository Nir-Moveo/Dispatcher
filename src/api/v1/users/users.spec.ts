import App from '../../../app';
import { UsersHandler } from './users.handler';

const AppTest = new App(3000).app;
const userHandler = new UsersHandler();

describe('User test', () => {

    test('Insert user', async () => {
        // deepcode ignore NoHardcodedCredentials: <please specify a reason of ignoring this>
        await userHandler.insert({ username: 'username', password: '123456' });
        const user = await userHandler.find({}).lean().exec();
        expect(user.length).toBe(1);
    });
});
