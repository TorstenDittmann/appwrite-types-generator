#!/usr/bin/env node

import camelCase from "camelcase";
import yargs from "yargs";
import path from "path";
import { Client, Database } from "node-appwrite";
import { hideBin } from "yargs/helpers";
import { mkdir, readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { exit } from "process";

const client = new Client();
const database = new Database(client);

/**
 * To Pascal Case.
 * @param {string} v 
 * @returns {string}
 */
const toPascal = v => camelCase(v, { pascalCase: true });

/**
 * Convert Collection to Typescript type.
 * @param {"text"|"numeric"|"boolean"} type 
 * @returns {"string"|"number"|"boolean"}
 */
const toType = type => ({
    "text": "string",
    "email": "string",
    "url": "string",
    "ip": "string",
    "wildcard": "string",
    "markdown": "string",
    "numeric": "number",
    "boolean": "boolean"
}[type]);

/**
 * Load configuration for Appwrite.
 * @param {string} file 
 * @returns {Promise<object>}
 */
const loadConfiguration = async file => {
    try {
        if (!existsSync(file)) {
            throw new Error("Configuration not found.")
        }
        const data = await readFile(file, 'utf8');
        const config = JSON.parse(data);

        client
            .setEndpoint(config.endpoint)
            .setProject(config.project)
            .setKey(config.key);

        return config;
    } catch (err) {
        console.error(err.message)
        exit(1);
    }
}

const generate = async ({ output, config }) => {
    config = await loadConfiguration(config);

    /** @type {Array<object>} collections*/
    const collections = (await database.listCollections()).collections;
    const types = [];
    collections.forEach(collection => {
        types.push({
            name: toPascal(collection.name),
            attributes: collection.rules.map(rule => {
                return {
                    name: rule.key,
                    type: toType(rule.type),
                    array: rule.array,
                    required: rule.required
                }
            })
        })
    })
    if (!existsSync(output)) {
        await mkdir(output, { recursive: true });
    }
    types.forEach(async (type) => {
        const content = `export type ${type.name} = {\n` +
            `${type.attributes.reduce((prev, next) => {
                return `${prev}    ${next.name}${next.required ? "" : "?"}: ${next.type ?? "unknown"}${next.array ? "[]" : ""};\n`;
            }, "")}` +
            "}";
        try {
            const destination = path.join(output, `./${type.name}.d.ts`);
            await writeFile(destination, content);
            console.log(`Generated ${destination}`)
        } catch (err) {
            console.error(err.message)
        }
    });
}

yargs(hideBin(process.argv))
    .command("generate", "Fetches Collection and creates Typescript Definitions", () => { }, generate)
    .option("output", {
        alias: "o",
        type: "string",
        description: "Output",
        default: "./"
    })
    .option("config", {
        alias: "c",
        type: "string",
        description: "Configuration file.",
        required: true
    })
    .demandCommand(1)
    .argv;