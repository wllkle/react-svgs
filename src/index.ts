#!/usr/bin/env node

import yargs from "yargs"
import {join} from "path"

import {logger} from "./logger";
import {IIconList} from "./interfaces";
import {validateName, validatePath} from "./validation";
import {capitaliseFirst} from "./strings";
import {getDefsTemplate, getTemplate} from "./templates";
import {createList} from "./parse";
import {saveFile} from "./save";

interface Arguments {
    path: string,
    out?: string,
    typescript?: boolean,
    name?: string,
    component?: string,
    defaultExport?: boolean,
    jsx?: boolean,
    propTypes?: boolean,
    // recursive?: boolean
}

// @ts-ignore
const argv: Arguments = yargs(process.argv.slice(2))
    .options({
        path: {
            type: "string",
            alias: "p",
            description: "Path to directory containing SVG files",
            demandOption: true
        },
        out: {
            type: "string",
            alias: "o",
            description: "Output path (directory will be created)",
            demandOption: true
        },
        typescript: {
            type: "boolean",
            alias: "t",
            description: "Output TypeScript files",
            default: true
        },
        name: {
            type: "string",
            alias: "n",
            description: "Directory name for generated icon component",
            default: "icon"
        },
        component: {
            type: "string",
            alias: "c",
            description: "React component name",
            default: "Icon"
        },
        defaultExport: {
            type: "boolean",
            alias: "x",
            description: "Use default exports",
            default: false
        },
        jsx: {
            type: "boolean",
            alias: "j",
            description: "Use JSX file extensions (.jsx, .tsx)",
            default: true
        },
        propTypes: {
            type: "boolean",
            alias: "pt",
            description: "Generate PropTypes definition for component",
            default: false
        },
        // TODO: implement recursive (tree of svg directories)
        // recursive: {
        //     type: "boolean",
        //     alias: "r",
        //     description: "Recursively run through directories from path",
        //     default: false
        // }
    })
    .parse()

const run = (): void => {
    const {path, out, typescript, name, defaultExport, propTypes, jsx} = argv
    let {component} = argv

    const inputPath = join(process.cwd(), path)
    const outputPath = join(process.cwd(), out || "", name.toLowerCase())
    const withExtension = (value: string) => `${value}.${typescript ? "t" : "j"}s${jsx ? "x" : ""}`

    if (!validatePath(inputPath)) {
        // TODO log error
        return;
    }

    if (!validateName(component)) {
        // TODO log error
        return;
    }
    component = capitaliseFirst(component);

    createList(inputPath).then((data: IIconList) => {
        logger.info(`Created list with ${Object.keys(data).length} items`)
        const contents = getTemplate(data, component, typescript, defaultExport, propTypes)
        saveFile(outputPath, withExtension("index"), contents)
        const defs = getDefsTemplate(data, typescript)
        saveFile(outputPath, withExtension("defs"), defs)
    })

    logger.log(outputPath)
}

run()
