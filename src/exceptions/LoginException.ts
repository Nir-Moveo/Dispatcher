import { HttpException } from './HttpException';
import { ExceptionTypesEnum } from './ExceptionTypes.enum';
/**
 * Custom Exceptions that extend Http Exceptions
 */
export class LoginException extends HttpException {
    constructor() {
        super(400, `Wrong credentials`, ExceptionTypesEnum.Login_UserNotFound);
        this.clientMessage = `Wrong credentials`;
    }
}
