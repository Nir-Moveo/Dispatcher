import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import { ValidationException, ForbiddenException } from '../exceptions';
import { Request, Response } from 'express';
import * as _ from 'lodash';

export const ValidationType = Object.freeze({
    QUERY: 'query',
    REQUEST: 'request',
    RESPONSE: 'response'
});

/**
 *  Receives A DTO and Validates if the data exist
 *
 * @template T
 * @param {*} type
 * @param {boolean} [skipMissingProperties=false]
 * @returns {express.RequestHandler}
 */
function validationMiddleware<T>(
    type: any,
    excludeExtraneousValues: boolean = false,
    skipMissingProperties = false,
    validationType: string = ValidationType.REQUEST,
    forbiddenValidation: boolean = false
): express.RequestHandler {
    return (req, res, next) => {
        const objectToValidate = getObjectToValidate(req, res, validationType);
        const strippedObject = plainToClass(type, objectToValidate, {
            excludeExtraneousValues
        });
        req.body = { ..._.pickBy(strippedObject, _.identity) };
        validate(strippedObject, { skipMissingProperties }).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const message = getMessageFromErrors(errors);
                forbiddenValidation ? next(new ForbiddenException()) : next(new ValidationException(message));
            } else {
                next();
            }
        });
    };
}

function getObjectToValidate(req: Request, res: Response, validationType: string) {
    switch (validationType) {
        case ValidationType.QUERY:
            return req.query;
        case ValidationType.REQUEST:
            return req.body;
        case ValidationType.RESPONSE:
            return '';
    }
}

function getMessageFromErrors(errors: ValidationError[]): string {
    const messages = errors.map((error: ValidationError) => {
        if (error.constraints) {
            return Object.values(error.constraints);
        } else if (error.children && error.children.length > 0) {
            return getMessageFromErrors(error.children);
        } else {
            return 'not found error on middleware';
        }
    });
    return messages.join(', ');
}

export default validationMiddleware;
