import camelCase from "camelcase";
import {Language} from "./language.js"
import {AttributeTypes} from "../attributes.js";

export class Kotlin extends Language {

    getType(type) {
        switch (type) {
            case AttributeTypes.TEXT:
                return "String";
            case AttributeTypes.EMAIL:
                return "String";
            case AttributeTypes.URL:
                return "String";
            case AttributeTypes.IP:
                return "String";
            case AttributeTypes.WILDCARD:
                return "String";
            case AttributeTypes.MARKDOWN:
                return "String"
            case AttributeTypes.NUMERIC:
                return "Number"
            case AttributeTypes.BOOLEAN:
                return "Boolean"
        }
    }

    getTypeDefault(type) {
        switch (type) {
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
        return ".kt"
    }

    getTypeOpenLine(name) {
        return `data class ${camelCase(name, {pascalCase: true})} (\n`
    }

    getTypePropertyLine(attribute) {
        return `\t${attribute.name}: ${this.getType(attribute.type) ?? "Any"}${attribute.required ? "" : "?"}${attribute.array ? "[]" : ""}${attribute.required ? "" : ` = ${this.getTypeDefault(attribute.type)}`},\n`;
    }

    getTypeCloseLine() {
        return ")\n"
    }
}