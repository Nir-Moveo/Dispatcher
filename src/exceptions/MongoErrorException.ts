import { HttpException } from './HttpException';
import { ExceptionTypesEnum } from './ExceptionTypes.enum';
/**
 * Custom Exceptions that extend Http Exceptions
 */
export class MongoErrorException extends HttpException {
    constructor(message: string = `mongo error`) {
        super(400, message, ExceptionTypesEnum.Mongo);
    }
}
