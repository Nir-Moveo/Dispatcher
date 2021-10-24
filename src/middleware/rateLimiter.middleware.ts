import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
    blockDuration: 60 * 15, // Block for 15 minutes
    points: 200,
    duration: 1
});

export const rateLimiterMiddleware = (request: Request, response: Response, next: NextFunction) => {
    rateLimiter
        .consume(request.ip)
        .then(() => {
            next();
        })
        .catch(() => {
            response.status(429).json('Too Many Requests');
        });
};
