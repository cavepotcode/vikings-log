import { ValidationMetadata } from 'class-validator/metadata/ValidationMetadata';
import { SchemaObject } from 'openapi3-ts';
import 'reflect-metadata';
import { IOptions } from './options';
export interface ISchemaConverters {
    [validatorType: string]: SchemaConverter | SchemaObject;
}
export declare type SchemaConverter = (meta: ValidationMetadata, options: IOptions) => SchemaObject | void;
export declare const defaultConverters: ISchemaConverters;
