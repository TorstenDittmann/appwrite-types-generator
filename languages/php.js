import camelCase from "camelcase";
import {Language} from "./language.js"
import {AttributeTypes} from "../attributes.js";

export class Php extends Language {

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
                return "bool"
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
                return "''";
            case AttributeTypes.EMAIL:
                return "''";
            case AttributeTypes.URL:
                return "''";
            case AttributeTypes.IP:
                return "''";
            case AttributeTypes.WILDCARD:
                return "''";
            case AttributeTypes.MARKDOWN:
                return "''";
            case AttributeTypes.NUMERIC:
                return "0";
            case AttributeTypes.BOOLEAN:
                return "false";
        }
    }

    getFileExtension() {
        return ".php"
    }

    getTypeOpenLine(name) {
        return `<?php\nclass ${camelCase(name, {pascalCase: true})} \n{\n\tpublic function __construct(\n`
    }

    getTypePropertyLine(attribute) {
        return `\t\tpublic ${attribute.required ? "" : "?"}${attribute.array ? "array" : this.getType(attribute.type) ?? ""} $${attribute.name}${attribute.required ? "" : ` = ${this.getTypeDefault(attribute)}`},\n`;
    }

    getTypeCloseLine() {
        return "\t)\n}"
    }
}