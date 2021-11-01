import { ObjectId, Types } from 'mongoose';
import { DocumentStatusEnum } from './utils/db/baseInterface.interface';
import { AccessibleRecordModel } from '@casl/mongoose';
import { ValidationException } from '../exceptions';
import { IQueryRequest, parseQuery, QueryBuilder } from './db/query-builder';
import * as dot from 'dot-object';
import { replaceDotWithUnderscore } from './utils/db/genericFunctions';

export default abstract class BaseModel {

    public schemaName: string;
    public schema: AccessibleRecordModel<any>;

    abstract getSchema(): AccessibleRecordModel<any>;

    constructor() {
        this.schema = this.getSchema();
        this.schemaName = this.schema.modelName;
    }

    /**
     * Deletes all records from a given table by query filter
     * implement bulk operation because of the shard
     */
    deleteMany(condition: Object) {
        return this.schema.updateMany(condition, { $set: { status: DocumentStatusEnum.DELETED } });
    }

    /**
     * Deletes a record from a given table by id.
     * This requires the table to have a column named "id".
     */
    deleteById(_id: string) {
        return this.schema.update({ _id }, { $set: { status: DocumentStatusEnum.DELETED } });
    }

    searchBuilder(query: IQueryRequest) {
        const props = Object.keys(this.schema.schema.paths);
        //Return search fields in query
        const searchQuery = new QueryBuilder()
            .queryTypeAggregation(true)
            .filter(query.filter)
            .searchFields({ word: query.search, searchableFields: props })
            .limit(query.limit)
            .skip(query.skip)
            .sort(query.sort)
            .between(query.from,query.to)
            .build();
        return { searchQuery };
    }

    searchQuery(query: IQueryRequest) {
        //Return search fields in query
        const { searchQuery } = this.searchBuilder(query);

        const pipeline = [{ ...searchQuery.filter }, { ...searchQuery.search }, { ...searchQuery.sort }, {...searchQuery.between}]
            //Filter empty query objects
            .filter((item: any) => Object.keys(item).length !== 0);
        return { searchQuery, pipeline };
    }

    search(query: IQueryRequest) {
        const { searchQuery, pipeline } = this.searchQuery(query);
        return Promise.all([this.schema.aggregate(pipeline).skip(searchQuery.skip).limit(searchQuery.limit), this.totalItemsQuery(pipeline)]).then((res) => {

            return {
                data: res[0],
                total: res[1] || 0
            };
        });
    }

    /**
     * Calculate the number of documents
     * @param pipeline  - pipeline query and filters
     */
    totalItemsQuery(pipeline: any[]) {
        return this.schema.aggregate([...pipeline, { $count: 'total' }]).then((res) => res[0]?.total);
    }
    /**
     * Gets all records from a given table.
     */
    getAll(skip: number = 0, limit: number = 10, filter: any = {}) {
        return this.schema.find(filter).limit(limit).skip(skip);
    }

    /**
     * Gets a record from a given table by field.
     * This requires the table to have a column named "field".
     */
    findOne(condition: any) {
        return this.schema.findOne(condition);
        // return this.schema.findOne(condition);
    }

    /**
     * Gets a record from a given table by fields.
     */
    find(condition: any) {
        return this.schema.find(condition) as any;
    }

    /**
     * Gets a record from a given table by id.
     * This requires the table to have a column named "id".
     */
    getById(id: any) {
        return this.findOne({ _id: id });
    }

    /**
     * Inserts a record into a given table.
     */
    insert(data: any) {
        const object = replaceDotWithUnderscore(data);
        return this.schema.create(object);
    }

    /**
     * This insert or update on conflict.
     * keep in mind this will work only on tables with primary key as `id`
     */
    upsert(obj: any) { }

    /**
     * Inserts a records into a given table.
     * The keys of obj are column names
     * and their values are the values to insert.
     */
    insertMany(items: any[]): Promise<any> {
        return this.schema.insertMany(items);
    }

    updateById(id: string | ObjectId, rawData: any): any {
        const _id = Types.ObjectId(id as string);
        const item = { ...rawData, _id };

        delete item?._id;
        //change from json to dot data
        const dotData = dot.dot(item);
        return this.schema.findOneAndUpdate({ _id }, dotData, { new: true });
    }

    update(query: any, fieldsToUpdate: any) {
        return this.schema.update(query, fieldsToUpdate, { new: true }) ;
    }

    updateMany(items: any[]) {
        if (!items || items?.filter((item) => item).length <= 0) return;

        const updates = items.map((item) => {
            const id = item?.id;
            delete item.id;
            const data = dot.dot(item);
            const _id = Types.ObjectId(id);
            return { 'updateOne': { filter: { _id }, update: data } }
        });

        return this.schema.bulkWrite(updates).catch(e => {
            console.log(e)
        });
    }

    /**
     * This insert or update on conflict.
     */
    async upsertMany(key: string, obj: any[]) {
        if (!obj || obj?.filter((item) => item).length <= 0) return;
        const upserts = obj.map(item => {
            return {
                'updateOne': {
                    'filter': { [`${key}`]: item[`${key}`] },
                    'update': { '$set': item },
                    'upsert': true,
                }
            }
        });
        return this.schema.bulkWrite(upserts);

    }
    getCategories() {
        const pipeline = [
            {
                $project:{
                    _id: 0,
                    'source.category': 1,
                    category: '$source.category'
                },
            },
            {
                $project:{
                    category: 1
                },
            },
            {
                $group : {
                    _id: '$category',
                    count: {
                        $sum: 1
                    }
                },
            },
            {
                $project:{
                    _id: 0,
                    category: '$_id',
                    count: '$count'
                }
            },
            {
                $sort:{
                    count: -1
                }
            }
        ]
        return this.schema.aggregate(pipeline);
    }

    getCountries(){
        const pipeline = [
            {
                $project:{
                    _id: 0,
                    'source.country': 1,
                    country: '$source.country'
                },
            },
            {
                $project:{
                    country: 1
                },
            },
            {
                $group : {
                    _id: '$country',
                    count: {
                        $sum: 1
                    }
                },
            },
            {
                $project:{
                    _id: 0,
                    country: '$_id',
                    count: '$count'
                }
            },
            {
                $sort:{
                    count: -1
                }
            }
        ]
        return this.schema.aggregate(pipeline)
    }

    getLanguages(){
        const pipeline = [
            {
                $project:{
                    _id: 0,
                    'source.language': 1,
                    language: '$source.language'
                },
            },
            {
                $project:{
                    language: 1
                },
            },
            {
                $group : {
                    _id: '$language',
                    count: {
                        $sum: 1
                    }
                },
            },
            {
                $project:{
                    _id: 0,
                    language: '$_id',
                    count: '$count'
                }
            },
            {
                $sort:{
                    count: -1
                }
            }
        ]
        return this.schema.aggregate(pipeline)
    }

    getSources(){
        const pipeline = [
            {
                $project:{
                    _id: 0,
                    'source.name': 1,
                    name: '$source.name'
                },
            },
            {
                $project:{
                    name: 1
                },
            },
            {
                $group : {
                    _id: '$name',
                    count: {
                        $sum: 1
                    }
                },
            },
            {
                $project:{
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            },
            {
                $sort:{
                    count: -1
                }
            }
        ]
        return this.schema.aggregate(pipeline)
    }
    
}
