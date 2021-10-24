import * as sanitizer from 'sanitizer';
import { Request, Response, NextFunction } from "express";


export const Sanitizer = async (request: Request, response: Response, next: NextFunction) => {
    request.body = sanitizeIt(request.body);
    request.params = sanitizeIt(request.params);
    request.query = sanitizeIt(request.query);
    next();
}



function sanitizeObj(dirty: string) {
    let clean: any = {};
    Object.keys(dirty).forEach((key: any) => {
        clean[key] = sanitizeIt(dirty[key]);
    });
    return clean;
};

function sanitizeArray(dirty: any) {
    let clean: any = [];
    dirty.forEach((d: any) => {
        clean.push(sanitizeIt(d));
    })
    return clean;
}

const sanitizeIt = function (theInput: any) {
    if (theInput === null || (typeof theInput === 'undefined')) {
        return theInput;
    } else {
        if (typeof theInput === 'object' && theInput.constructor !== Array) {
            return sanitizeObj(theInput);
        } else if (theInput.constructor === Array) {
            return sanitizeArray(theInput);
        } else {
            if (typeof theInput === 'string') {
                let clean = sanitizer.sanitize(theInput);
                clean = sanitizer.escape(clean);
                return clean;
            } else {
                return theInput;
            }
        }
    }
}