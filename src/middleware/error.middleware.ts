import { NextFunction, Request, Response } from 'express';
import { ExceptionTypesEnum, HttpException } from '../exceptions';

async function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.clientMessage || 'Something went wrong';
    const error_custom_code = error.error_custom_code || ExceptionTypesEnum.Unknown;

    let responseBody =
        process.env.NODE_ENV == 'production'
            ? {
                status,
                error_custom_code,
                message
            }
            : {
                status,
                error_custom_code,
                message,
                stack: error.stack,
                error_message: error.message,
                dev_message: error.devMessage
            };
    try {
        response.status(status).json(responseBody);
    } catch (err) {
        response.status(err.status).json(err);
    }
}

export default errorMiddleware;
