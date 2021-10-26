import { DocumentDefinition, SchemaDefinition } from 'mongoose';
import { Schema, SchemaOptions, ObjectId } from 'mongoose';
import { AccessibleFieldsDocument, accessibleFieldsPlugin, accessibleRecordsPlugin } from '@casl/mongoose';

export type ReMap<M, R> = { [key in keyof M]: R }; // retype keys of a map 'M' to a different type 'R'

export type Mesh<T01, T02, T03 = T02, T04 = T03, T05 = T04> = T01 & T02 & T03 & T04 & T05; // Mesh up to 5 types (2 minimum)  in to one

export interface BoundTo<C> {
    (this: C): any;
}

export type StrongSchema<M> = { [key in keyof M]: any }; // & {ref: string};
// ReMap<M, (SchemaTypeOpts<any> | Schema | SchemaType) & {ref: string}>; //{ [key in keyof M]: (SchemaTypeOpts<any> | Schema | SchemaType) & {ref: string} }

/**
 * @description create mongoose scheme from 'schemaBlueprint' & 'options', and assign the 'methods' to the scheme.methods field,
 *  using 'Object.assign' (not override the existing content).
 *
 * @param schemaBlueprint scheme definition wrapped in 'StrongSchema' interface.
 * @param methods additional model methods
 * @param options mongoose native schema options
 */
export function createStrongSchema<IModel>(schemaBlueprint: SchemaDefinition<DocumentDefinition<any>>, options?: SchemaOptions) {
    const schema = new Schema<IModel>(schemaBlueprint, options);
    return schema;
}

export interface ISchema extends AccessibleFieldsDocument {
    _id: ObjectId;
}

export enum DocumentStatusEnum {
    DELETED = 0,
    ACTIVE = 1
}
