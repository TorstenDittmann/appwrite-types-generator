#!/usr/bin/env node

import yargs from "yargs";
import path from "path";
import {Client, Database} from "node-appwrite";
import {hideBin} from "yargs/helpers";
import {mkdir, readFile, writeFile} from "fs/promises";
import {existsSync} from "fs";
import {exit} from "process";
import {Typescript} from "./languages/typescript.js"

const client = new Client();
const database = new Database(client);

const languageClasses = {
    "typescript": Typescript,
    "kotlin": Kotlin
}

/**
 * Load configuration for Appwrite.
 * @param {string} file
 * @returns {Promise<object>}
 */
const loadConfiguration = async file => {

    try {
        if (!existsSync(file)) {
            onError("Configuration not found.")
        }

        const data = await readFile(file, 'utf8');
        const config = JSON.parse(data);

        client
            .setEndpoint(config.endpoint)
            .setProject(config.project)
            .setKey(config.key);

        return config;
    } catch (err) {
        onError(err.message)
    }
}

const generate = async ({output, config, language}) => {
    await loadConfiguration(config);

    const clazz = languageClasses[language];
    if (!clazz) {
        onError(`Language must be one of [${Object.keys(languageClasses)}]`);
    }
    const lang = new clazz();

    /** @type {Array<object>} collections*/
    const collections = (await database.listCollections()).collections;
    const types = buildCollectionTypes(collections)

    if (!existsSync(output)) {
        await mkdir(output, {recursive: true});
    }

    for (const type of types) {
        const content = lang.generate(type)

        try {
            const destination = path.join(output, `./${type.name}${lang.getFileExtension()}`);
            await writeFile(destination, content);
            console.log(`Generated ${destination}`)
        } catch (err) {
            console.error(err.message)
        }
    }
}

const buildCollectionTypes = (collections) => {
    let types = [];
    collections.forEach(collection => {
        types.push({
            name: collection.name,
            attributes: collection.rules.map(rule => {
                return {
                    name: rule.key,
                    type: rule.type,
                    array: rule.array,
                    required: rule.required
                }
            }).sort((a, b) => {
                return (a.required === b.required)
                    ? 0
                    : a.required
                        ? -1
                        : 1;
            })
        })
    })
    return types;
}

const onError = function catchError(error) {
    console.error(error)
    exit(1);
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
    .option("language", {
        alias: "l",
        type: "string",
        description: "Output language",
        default: "typescript"
    })
    .demandCommand(1)
    .argv;