import * as _ from 'lodash';
import moment = require('moment');
import * as mongoose from 'mongoose';
import { mapObjIndexed } from 'ramda';

export interface ISearchQuery {
    word: string;
    searchableFields?: string[];
}
export interface IQueryRequest {
    search?: string;
    filter?: {};
    skip: number;
    limit: number;
    sort?: any;
    from?:any;
    to?:any;
    between?:any;
}

export interface IQuery {
    search?: any;
    filter?: any;
    sort?: any;
    skip: number;
    limit: number;
    from?:any;
    to?:any;
    between?:any;
}

export class QueryBuilder {
    private readonly _query: IQuery = { search: {}, filter: {}, sort: {}, skip: 0, limit: 10 };
    private _aggregation: boolean = false;

    public build(): IQuery {
        return this._query;
    }

    queryTypeAggregation(aggregation: boolean) {
        this._aggregation = aggregation;
        return this;
    }

    skip(skip: number) {
        this._query.skip = Number(skip);
        return this;
    }
    from(from:string){
        this._query.from = new Date(from);
        return this;
    }
    to(to:string){
        this._query.to = new Date(to);
        return this;
    }
    between(from:any,to:any){
        if(from && to){
            this._query.between= this._aggregation ? { $match : { 'publishedAt': {$gte:new Date(from), $lte:new Date(to)}}} : { 'publishedAt': {$gte:new Date(from), $lte:new Date(to)}}
        }
            return this;
    }

    limit(limit: number) {
        this._query.limit = Number(limit);
        return this;
    }

    searchFields(searchQuery?: ISearchQuery) {
        if (searchQuery && searchQuery.word && searchQuery.searchableFields) {
            const search: any = [];
            //Add all fields to word search in
            searchQuery.searchableFields.forEach((field: any) => {
                const searchFieldsArr: any = {};
                searchFieldsArr[field] = { $regex: `.*${searchQuery.word.trim()}.*`, $options: 'i' };
                search.push(searchFieldsArr);
            });
            this._query.search = this._aggregation ? { $match: { $or: [...search] } } : { $or: [...search] };
        }
        return this;
    }

    filter(filter: any) {
        const fields = Object.keys(filter);
        if (fields.length > 0) {
            fields.forEach((item: string, index: number) => {
                const entity = filter[`${item}`];
                const isMongoId = entity.length > 0 ? mongoose.isValidObjectId(entity[0]) && mongoose.Types.ObjectId(entity[0]).toString() === entity[0] : false;
                //Check if the key contain _id if is true cast to object id
                filter[`${item}`] = { $in: isMongoId ? entity.map((item: any) => mongoose.Types.ObjectId(item)) : filter[`${item}`] };
                return filter[`${item}`];
            });
            this._query.filter = this._aggregation ? { $match: { ...filter } } : { ...filter };
        }
        return this;
    }

    sort(sort: any) {
        if (sort) {
            //Fix sort value
            Object.keys(sort).forEach(function (key) {
                sort[key] = sort[key] == 0 ? -1 : 1;
            });
            this._query.sort = this._aggregation ? { $sort: { ...sort } } : { ...sort };
        }
        return this;
    }

}

const isObjectId = (v: any) => mongoose.isValidObjectId(v);
const toObjectId = (v: any) => mongoose.Types.ObjectId(v);
const isPrimitiveType = (v: any) => typeof v === 'boolean' || typeof v === 'number' || typeof v === 'undefined' || v === null || v instanceof RegExp || typeof v === 'string' || v instanceof Date;

const parseValue: any = (v: any) => (isObjectId(v) ? toObjectId(v) : isPrimitiveType(v) ? v : parseQuery(v));

export const parseQuery = (q: any) => (Array.isArray(q) ? q.map(parseValue) : mapObjIndexed(parseValue, q));
