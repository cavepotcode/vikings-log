"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const _ = require("lodash");
const debug = require('debug')('routing-controllers-openapi');
const decorators_1 = require("./decorators");
const defaultConverters_1 = require("./defaultConverters");
const options_1 = require("./options");
var decorators_2 = require("./decorators");
exports.JSONSchema = decorators_2.JSONSchema;
function validationMetadatasToSchemas(metadatas, userOptions) {
    const options = Object.assign({}, options_1.defaultOptions, userOptions);
    const schemas = _(metadatas)
        .groupBy('target.name')
        .mapValues(ownMetas => {
        const target = ownMetas[0].target;
        const metas = ownMetas.concat(getInheritedMetadatas(target, metadatas));
        const properties = _(metas)
            .groupBy('propertyName')
            .mapValues((propMetas, propKey) => {
            const schema = applyConverters(propMetas, options);
            return applyDecorators(schema, target, options, propKey);
        })
            .value();
        const definitionSchema = {
            properties,
            type: 'object'
        };
        const required = getRequiredPropNames(target, metas, options);
        if (required.length > 0) {
            definitionSchema.required = required;
        }
        return applyDecorators(definitionSchema, target, options, target.name);
    })
        .value();
    return schemas;
}
exports.validationMetadatasToSchemas = validationMetadatasToSchemas;
function getInheritedMetadatas(target, metadatas) {
    return metadatas.filter(d => d.target instanceof Function &&
        target.prototype instanceof d.target &&
        !_.find(metadatas, {
            propertyName: d.propertyName,
            target,
            type: d.type
        }));
}
function applyConverters(propertyMetadatas, options) {
    const converters = Object.assign({}, defaultConverters_1.defaultConverters, options.additionalConverters);
    const convert = (meta) => {
        const converter = converters[meta.type];
        if (!converter) {
            debug('No schema converter found for validation metadata', meta);
            return {};
        }
        const items = _.isFunction(converter) ? converter(meta, options) : converter;
        return meta.each ? { items, type: 'array' } : items;
    };
    return _.merge({}, ...propertyMetadatas.map(convert));
}
function applyDecorators(schema, target, options, propertyName) {
    const additionalSchema = decorators_1.getMetadataSchema(target.prototype, propertyName);
    return _.isFunction(additionalSchema)
        ? additionalSchema(schema, options)
        : _.merge({}, schema, additionalSchema);
}
function getRequiredPropNames(target, metadatas, options) {
    function isDefined(metas) {
        return _.some(metas, { type: class_validator_1.ValidationTypes.IS_DEFINED });
    }
    function isOptional(metas) {
        return _.some(metas, ({ type }) => _.includes([class_validator_1.ValidationTypes.CONDITIONAL_VALIDATION, class_validator_1.ValidationTypes.IS_EMPTY], type));
    }
    return _(metadatas)
        .groupBy('propertyName')
        .pickBy(metas => {
        const [own, inherited] = _.partition(metas, d => d.target === target);
        return options.skipMissingProperties
            ? isDefined(own) || (!isOptional(own) && isDefined(inherited))
            : !(isOptional(own) || isOptional(inherited));
    })
        .keys()
        .value();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxxREFBaUQ7QUFFakQsNEJBQTJCO0FBRTNCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO0FBRTdELDZDQUFnRDtBQUNoRCwyREFBdUQ7QUFDdkQsdUNBQW9EO0FBRXBELDJDQUF5QztBQUFoQyxrQ0FBQSxVQUFVLENBQUE7QUFNbkIsU0FBZ0IsNEJBQTRCLENBQzFDLFNBQStCLEVBQy9CLFdBQStCO0lBRS9CLE1BQU0sT0FBTyxxQkFDUix3QkFBYyxFQUNkLFdBQVcsQ0FDZixDQUFBO0lBRUQsTUFBTSxPQUFPLEdBQW9DLENBQUMsQ0FBQyxTQUFTLENBQUM7U0FDMUQsT0FBTyxDQUFDLGFBQWEsQ0FBQztTQUN0QixTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDcEIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQWtCLENBQUE7UUFDN0MsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQTtRQUV2RSxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ3hCLE9BQU8sQ0FBQyxjQUFjLENBQUM7YUFDdkIsU0FBUyxDQUFDLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ2hDLE1BQU0sTUFBTSxHQUFHLGVBQWUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUE7WUFDbEQsT0FBTyxlQUFlLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDMUQsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxFQUFFLENBQUE7UUFFVixNQUFNLGdCQUFnQixHQUFpQjtZQUNyQyxVQUFVO1lB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