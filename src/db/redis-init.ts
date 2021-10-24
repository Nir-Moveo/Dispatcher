import * as redis from 'redis';

const RedisClient = redis.createClient({
    host: 'redis-server',
    port: 6379
});

export default RedisClient;
