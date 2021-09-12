import camelCase from "camelcase";
import {Language} from "./language.js"
import {AttributeTypes} from "../attributes.js";

export class Kotlin extends Language {

    getType(type) {
        switch (type) {
            case AttributeTypes.TEXT:
            case AttributeTypes.EMAIL:
            case AttributeTypes.URL:
            case AttributeTypes.IP:
            case AttributeTypes.WILDCARD:
            case AttributeTypes.MARKDOWN:
                return "String"
            case AttributeTypes.NUMERIC:
                return "Number"
            case AttributeTypes.BOOLEAN:
                return "Boolean"
        }
    }

    getTypeDefault(attribute) {
        if (!attribute.required) {
            return "null";
        }
        if (attribute.array) {
            return `listOf<${this.getType(attribute.type)}>()`;
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
        return ".kt"
    }

    getTypeOpenLine(name) {
        return `data class ${camelCase(name, {pascalCase: true})} (\n`
    }

    getTypePropertyLine(attribute) {
        return `\t${attribute.name}: ${attribute.array ? "List<" : ""}${this.getType(attribute.type) ?? "Any"}${attribute.array ? ">" : ""}${attribute.required ? "" : "?"}${attribute.required ? "" : ` = ${this.getTypeDefault(attribute)}`},\n`;
    }

    getTypeCloseLine() {
        return ")\n"
    }
}