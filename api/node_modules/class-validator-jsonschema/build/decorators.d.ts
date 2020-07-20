import { SchemaObject } from 'openapi3-ts';
import 'reflect-metadata';
import { IOptions } from './options';
export declare type DecoratorSchema = SchemaObject | ((source: SchemaObject, options: IOptions) => SchemaObject);
export declare function JSONSchema(schema: DecoratorSchema): (target: object | Function, key?: string | undefined) => void;
export declare function getMetadataSchema(target: object | Function, key: string): DecoratorSchema;
