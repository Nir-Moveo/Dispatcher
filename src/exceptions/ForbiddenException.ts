import { HttpException } from './HttpException';
import { ExceptionTypesEnum } from './ExceptionTypes.enum';
/**
 * Custom Exceptions that extend Http Exceptions
 */
export class ForbiddenException extends HttpException {
    constructor() {
        super(403, `Forbidden`, ExceptionTypesEnum.Forbidden);
    }
}
