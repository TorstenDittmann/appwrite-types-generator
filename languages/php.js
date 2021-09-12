import { Language } from "./language.js";
import { AttributeTypes } from "../attributes.js";
import camelcase from "camelcase";

export class Php extends Language {
    static getType(type) {
        switch (type) {
            case AttributeTypes.TEXT:
            case AttributeTypes.EMAIL:
            case AttributeTypes.URL:
            case AttributeTypes.IP:
            case AttributeTypes.WILDCARD:
            case AttributeTypes.MARKDOWN:
                return "string";
            case AttributeTypes.NUMERIC:
                return "int";
            case AttributeTypes.BOOLEAN:
                return "bool";
        }
    }

    static getTypeFormatted(name) {
        return camelcase(name, {pascalCase: true});
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
                return "''";
            case AttributeTypes.NUMERIC:
                return "0";
            case AttributeTypes.BOOLEAN:
                return "false";
        }
    }

    getFileExtension() {
        return ".php";
    }
}
