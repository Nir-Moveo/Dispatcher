import { DocumentStatusEnum } from './utils/db/baseInterface.interface';
import BaseModel from './base.model';
import { IQueryRequest } from './db/query-builder';

export default abstract class BaseHandler<M extends BaseModel> {
    protected model: M;

    abstract getModel(): M;

    constructor() {
        this.model = this.getModel();
    }

    find(condition: any) {
        return this.model.find({ ...condition, status: DocumentStatusEnum.ACTIVE });
    }

    findOne(condition: any) {
        return this.model.findOne({
            ...condition,
            status: DocumentStatusEnum.ACTIVE
        });
    }

    search(query: IQueryRequest) {
        return this.model.search(query);
    }

    readAll(skip: number, limit: number, select: any = {}) {
        return this.model.getAll(skip, limit, {
            ...select,
            status: DocumentStatusEnum.ACTIVE
        });
    }

    read(id: string) {
        return this.model.getById(id);
    }

    insert(data: any) {
        return this.model.insert(data);
    }

    insertMany(data: any[]): any {
        if (data.length == 0) return data;
        return this.model.insertMany(data);
    }

    updateById(id: string, object: any) {
        return this.model.updateById(id, object);
    }

    update(filter: any, object: any) {
        return this.model.update(filter, object);
    }

    deleteById(id: string) {
        return this.model.deleteById(id);
    }

    deleteMany(query: any) {
        return this.model.deleteMany(query);
    }

    upsertMany(key: string, obj: any[]){
        return this.model.upsertMany(key,obj);
    }
    getCategories(){
        return this.model.getCategories();
    }
    getCountries(){
        return this.model.getCountries();
    }
    getLanguages(){
        return this.model.getLanguages();
    }
    getSources(){
        return this.model.getSources();
    }
}
