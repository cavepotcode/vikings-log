"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const SCHEMA_KEY = Symbol('class-validator-jsonschema:JSONSchema');
function JSONSchema(schema) {
    return (target, key) => {
        if (key) {
            setMetadataSchema(schema, target.constructor, key);
        }
        else {
            setMetadataSchema(schema, target, target.name);
        }
    };
}
exports.JSONSchema = JSONSchema;
function getMetadataSchema(target, key) {
    return Reflect.getMetadata(SCHEMA_KEY, target.constructor, key) || {};
}
exports.getMetadataSchema = getMetadataSchema;
function setMetadataSchema(value, target, key) {
    return Reflect.defineMetadata(SCHEMA_KEY, value, target, key);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNEJBQXlCO0FBSXpCLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO0FBb0JsRSxTQUFnQixVQUFVLENBQUMsTUFBdUI7SUFDaEQsT0FBTyxDQUFDLE1BQXlCLEVBQUUsR0FBWSxFQUFFLEVBQUU7UUFDakQsSUFBSSxHQUFHLEVBQUU7WUFDUCxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQTtTQUNuRDthQUFNO1lBQ0wsaUJBQWlCLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRyxNQUFtQixDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzdEO0lBQ0gsQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQVJELGdDQVFDO0FBS0QsU0FBZ0IsaUJBQWlCLENBQy9CLE1BQXlCLEVBQ3pCLEdBQVc7SUFFWCxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO0FBQ3ZFLENBQUM7QUFMRCw4Q0FLQztBQUtELFNBQVMsaUJBQWlCLENBQ3hCLEtBQXNCLEVBQ3RCLE1BQXlCLEVBQ3pCLEdBQVc7SUFFWCxPQUFPLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDL0QsQ0FBQyJ9