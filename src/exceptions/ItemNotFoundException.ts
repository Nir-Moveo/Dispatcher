import { HttpException } from './HttpException';
import { ExceptionTypesEnum } from './ExceptionTypes.enum';
/**
 * Custom Exceptions that extend Http Exceptions
 */
export class ItemNotFoundException extends HttpException {
    constructor(id: string) {
        super(400, `Item with id ${id} not found`, ExceptionTypesEnum.ItemNotFound);
    }
}
