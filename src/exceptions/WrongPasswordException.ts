import { HttpException } from './HttpException';
import { ExceptionTypesEnum } from './ExceptionTypes.enum';
/**
 * Custom Exceptions that extend Http Exceptions
 */
export class WrongPasswordException extends HttpException {
    constructor() {
        super(400, `wrong password`, ExceptionTypesEnum.WrongPassword);
    }
}
