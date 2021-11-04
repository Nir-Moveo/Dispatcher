import { Request, Response, NextFunction } from 'express';
import BaseHandler from './base.handler';
import { ValidationException } from '../exceptions';
import * as _ from 'lodash';
import { IQueryRequest } from './db/query-builder';

export default abstract class BaseController<T extends BaseHandler<any>> {
    protected handler: T;
    abstract getHandler(): T;

    constructor() {
        this.handler = this.getHandler();
    }

    async search(request: Request, response: Response, next: NextFunction, pickFields: any = null) {
        try {
            const query: IQueryRequest = {
                skip: 0, //default
                limit: 10, //default
                filter: {},
                search:"",
                ...request.body
            };
            const result = await this.handler.search(query);
            return response.send(result);
        } catch (error) {
            next(new ValidationException(error.message));
        }
    }

    async readAll(request: Request, response: Response, next: NextFunction, pickFields: any = null) {
        try {
            const skip = request.query.skip || 0;
            const limit = request.query.limit || 50;
            const result = await this.handler.readAll(Number(skip), Number(limit));
            return response.send(result);
        } catch (error) {
            next(new ValidationException(error.message));
        }
    }

    async read(request: Request, response: Response, next: NextFunction, pickFields: any = null) {
        const id = request.params.id;
        try {
            const result = await this.handler.read(id);
            return pickFields ? response.send(_.pick(result, pickFields)) : response.send(result);
        } catch (error) {
            next(new ValidationException(error.message));
        }
    }

    async insert(request: Request, response: Response, next: NextFunction) {
        try {
            await this.handler.insert(request.body);
            return response.status(201).send();
        } catch (error) {
            next(new ValidationException(error.message));
        }
    }

    async insertMany(request: Request, response: Response, next: NextFunction) {
        try {
            await this.handler.insertMany(request.body);
            return response.status(201).send();
        } catch (error) {
            next(new ValidationException(error.message));
        }
    }

    async deleteById(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            const result = await this.handler.deleteById(id);
            return response.send(result);
        } catch (error) {
            next(new ValidationException(error.message));
        }
    }

    async updateById(request: Request, response: Response, next: NextFunction, pickFields: any = null) {
        try {
            const id = request.params.id;
            const data = request.body;
            const result = await this.handler.updateById(id, data);
            return pickFields ? response.send(_.pick(result, pickFields)) : response.send(result);
        } catch (error) {
            next(new ValidationException(error.message));
        }
    }
    /**
     * generic function to get all dropdowns by key
     */
         async getDropdown(request: Request, response: Response, next: NextFunction,key:string){
            try{
                const result = await this.handler.getDropdown(key);
                return response.send(result);
            } catch (error){
                next(new ValidationException(error.message));
            }
        }
        
    /**
     * function to get the statistics of sources
     */
    async getSourceStatistics(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await this.handler.getSourceStatistics();
            return response.send(result);
        } catch (error) {
            next(new ValidationException(error.message));
        }
    }
    /**
     * function to get the statistics of all articles by published date
     */
    async getDatesStatistics(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await this.handler.getDates();   
            return response.send(result);
        } catch (error) {
            next(new ValidationException(error.message));
        }
    }

}
