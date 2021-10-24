import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';
import { UsersHandler } from '../users.handler';

/**
 * This function validate the user input against the picklist in the SF.
 *
 * @param fieldName - The field name in the object ( The SF field name )
 * @param tableName - The SF object name to look for.
 * @param value  - The value user input
 */
@ValidatorConstraint({ async: true })
export class IsUserExistConstraint implements ValidatorConstraintInterface {
    async validate(value: string, args: ValidationArguments) {
        const isUserExist = (await new UsersHandler().isUserExist(value)) as boolean;
        return !isUserExist;
    }

    defaultMessage(args: ValidationArguments) {
        // here you can provide default error message if validation failed
        return `User already exist`;
    }
}

export function IsUserExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserExistConstraint
        });
    };
}
