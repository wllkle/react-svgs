#!/usr/bin/env node

import yargs from "yargs"
import {join} from "path"

import {logger} from "./src/logger";
import {IIconList} from "./src/interfaces";
import {validatePath} from "./src/validation";
import {getTemplate} from "./src/templates";
import {createList} from "./src/parse";
import {saveFile} from "./src/save";

interface Arguments {
    path: string,
    out?: string,
    typescript?: boolean,
    componentName?: string,
    directory?: boolean,
    defaultExport?: boolean,
    defaultClassName?: string,
    // recursive?: boolean,
    jsx?: boolean
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
            description: "Output path",
            // demandOption: true
        },
        typescript: {
            type: "boolean",
            alias: "t",
            description: "Output TypeScript files",
            default: true
        },
        componentName: {
            type: "string",
            alias: "c",
            description: "Filename of generated icon component",
            default: "icon"
        },
        directory: {
            type: "boolean",
            alias: "d",
            description: "Create directory for component",
            default: false,
        },
        defaultExport: {
            type: "boolean",
            alias: "de",
            description: "Use default exports",
            default: false
        },
        defaultClassName: {
            type: "string",
            alias: "cn",
            description: "Default class name for generated icons",
            default: "icon"
        },
        // recursive: {
        //     type: "boolean",
        //     alias: "r",
        //     description: "Recursively run through directories from path",
        //     default: false
        // },
        jsx: {
            type: "boolean",
            alias: "j",
            description: "Use jsx file extensions",
            default: false
        }
    })
    .parse()

const run = (): void => {
    const {path, out, typescript, componentName, defaultExport, defaultClassName, directory, jsx} = argv

    const inputPath = join(process.cwd(), path)
    let outputPathPart: string
    const extension = `.${typescript ? "t" : "j"}s${jsx ? "x" : ""}`
    if (directory) {
        outputPathPart = join(componentName.toLowerCase(), `index${extension}`)
    } else {
        outputPathPart = `${componentName.toLowerCase()}${extension}`
    }
    const outputPath = join(process.cwd(), out || "", outputPathPart)

    if (!validatePath(inputPath)) {
        return
    }

    createList(inputPath).then((data: IIconList) => {
        logger.info(`Created list with ${Object.keys(data).length} items`)

        const contents = getTemplate(data, typescript, componentName, defaultExport, defaultClassName)

        saveFile(outputPath, contents)
    })

    logger.log(inputPath + " " + outputPath)
}

run()
