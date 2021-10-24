import { HttpException } from './HttpException';
import { ExceptionTypesEnum } from './ExceptionTypes.enum';
/**
 * Custom Exceptions that extend Http Exceptions
 */
export class ValidationException extends HttpException {
    constructor(message: string) {
        super(400, message, ExceptionTypesEnum.Validation);
    }
}
