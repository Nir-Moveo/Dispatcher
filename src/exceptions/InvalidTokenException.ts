import { HttpException } from './HttpException';
import { ExceptionTypesEnum } from './ExceptionTypes.enum';
/**
 * Custom Exceptions that extend Http Exceptions
 */
export class InvalidTokenException extends HttpException {
    constructor() {
        super(401, `Invalid token`, ExceptionTypesEnum.InvalidToken);
    }
}
