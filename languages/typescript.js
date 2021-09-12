import camelCase from "camelcase";
import {Language} from "./language.js"
import {AttributeTypes} from "../attributes.js";

export class Typescript extends Language {

    getType(type) {
        switch (type) {
            case AttributeTypes.TEXT:
            case AttributeTypes.EMAIL:
            case AttributeTypes.URL:
            case AttributeTypes.IP:
            case AttributeTypes.WILDCARD:
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
            case AttributeTypes.EMAIL:
            case AttributeTypes.URL:
            case AttributeTypes.IP:
            case AttributeTypes.WILDCARD:
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