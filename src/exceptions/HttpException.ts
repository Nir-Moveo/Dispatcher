export class HttpException extends Error {
    status: number;
    devMessage: string;
    clientMessage: string = '';
    message: string;
    error_custom_code: number;

    constructor(status: number, devMessage: string, error_custom_code: number, message: string = '') {
        super(devMessage);
        this.status = status;
        this.message = message;
        this.devMessage = devMessage;
        this.error_custom_code = error_custom_code;
    }
}
