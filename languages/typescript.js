import camelCase from "camelcase";
import {Language} from "./language.js"
import {AttributeTypes} from "../attributes.js";

export class Typescript extends Language {

    getType(type) {
        switch (type) {
            case AttributeTypes.TEXT:
                return "string";
            case AttributeTypes.EMAIL:
                return "string";
            case AttributeTypes.URL:
                return "string";
            case AttributeTypes.IP:
                return "string";
            case AttributeTypes.WILDCARD:
                return "string";
            case AttributeTypes.MARKDOWN:
                return "string"
            case AttributeTypes.NUMERIC:
                return "number"
            case AttributeTypes.BOOLEAN:
                return "boolean"
        }
    }

    getTypeDefault(attribute) {
        if (!attribute.required) {
            return "null";
        }
        if (attribute.array) {
            return "[]";
        }
        switch (attribute.type) {
            case AttributeTypes.TEXT:
                return '""';
            case AttributeTypes.EMAIL:
                return '""';
            case AttributeTypes.URL:
                return '""';
            case AttributeTypes.IP:
                return '""';
            case AttributeTypes.WILDCARD:
                return '""';
            case AttributeTypes.MARKDOWN:
                return '""';
            case AttributeTypes.NUMERIC:
                return "0";
            case AttributeTypes.BOOLEAN:
                return "false";
        }
    }

    getFileExtension() {
        return ".d.ts";
    }

    getTypeOpenLine(name) {
        return `export type ${camelCase(name, {pascalCase: true})} = {\n`;
    }

    getTypePropertyLine(attribute) {
        return `\t${attribute.name}${attribute.required ? "" : "?"}: ${this.getType(attribute.type) ?? "unknown"}${attribute.array ? "[]" : ""};\n`;
    }

    getTypeCloseLine() {
        return "}\n";
    }
}