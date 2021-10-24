import { HttpException } from './HttpException';

/**
 * Custom Exceptions that extend Http Exceptions
 */
export class UserErrorException extends HttpException {
    clientMessage: string;
    message: string = '';

    constructor(status: number, error_custom_code: number, devMessage: string = '', clientMessage: string = '') {
        super(status, devMessage, error_custom_code);
        this.clientMessage = clientMessage;
    }
}
