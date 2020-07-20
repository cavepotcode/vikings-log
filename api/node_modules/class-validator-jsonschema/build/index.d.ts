import { ValidationMetadata } from 'class-validator/metadata/ValidationMetadata';
import { SchemaObject } from 'openapi3-ts';
import { IOptions } from './options';
export { JSONSchema } from './decorators';
export declare function validationMetadatasToSchemas(metadatas: ValidationMetadata[], userOptions?: Partial<IOptions>): {
    [key: string]: SchemaObject;
};
