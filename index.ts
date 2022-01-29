#!/usr/bin/env node

import yargs from "yargs"
import {join} from "path"

import {logger} from "./src/logger";
import {IIconList} from "./src/interfaces";
import {validatePath, validateName} from "./src/validation";
import {capitaliseFirst} from "./src/strings";
import {getTemplate} from "./src/templates";
import {createList} from "./src/parse";
import {saveFile} from "./src/save";

interface Arguments {
    path: string,
    out?: string,
    typescript?: boolean,
    name?: string,
    directory?: boolean,
    fileName?: string,
    defaultExport?: boolean,
    className?: string,
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
            description: "Output path",
            // demandOption: true
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
            description: "React component name",
            default: "Icon"
        },
        directory: {
            type: "boolean",
            alias: "d",
            description: "Generate directory containing component",
            default: false,
        },
        fileName: {
            type: "string",
            alias: "f",
            description: "File/directory name for generated icon component",
            default: "icon"
        },
        defaultExport: {
            type: "boolean",
            alias: "x",
            description: "Use default exports",
            default: true
        },
        className: {
            type: "string",
            alias: "c",
            description: "Default className for generated icons",
            default: "icon"
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
            default: true
        },
        // recursive: {
        //     type: "boolean",
        //     alias: "r",
        //     description: "Recursively run through directories from path",
        //     default: false
        // }
    })
    .parse()

const run = (): void => {
    const {path, out, typescript, fileName, defaultExport, className, propTypes, directory, jsx} = argv
    let {name} = argv

    const inputPath = join(process.cwd(), path)
    let outputPathPart: string
    const extension = `.${typescript ? "t" : "j"}s${jsx ? "x" : ""}`
    if (directory) {
        outputPathPart = join(fileName.toLowerCase(), `index${extension}`)
    } else {
        outputPathPart = `${fileName.toLowerCase()}${extension}`
    }
    const outputPath = join(process.cwd(), out || "", outputPathPart)

    if (!validatePath(inputPath)) {
        // TODO log error
        return;
    }

    if (!validateName(name)) {
        // TODO log error
        return;
    }
    name = capitaliseFirst(name);

    createList(inputPath).then((data: IIconList) => {
        logger.info(`Created list with ${Object.keys(data).length} items`)
        const contents = getTemplate(data, name, typescript, defaultExport, className, propTypes)
        saveFile(outputPath, contents)
    })

    logger.log(outputPath)
}

run()
