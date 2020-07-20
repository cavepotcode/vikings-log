import { MetadataStorage } from 'class-transformer/metadata/MetadataStorage';
import { ValidatorOptions } from 'class-validator';
import { ISchemaConverters } from './defaultConverters';
export interface IOptions extends ValidatorOptions {
    additionalConverters: ISchemaConverters;
    classTransformerMetadataStorage?: MetadataStorage;
    refPointerPrefix: string;
}
export declare const defaultOptions: IOptions;
