#!/usr/bin/env node

import yargs from "yargs"
import {join} from "path"

import {logger} from "./logger";
import {IIconList} from "./interfaces";
import {Validate} from "./validate";
import {capitaliseFirst, extension} from "./strings";
import {getTypesTemplate, getTemplate} from "./templates";
import {createList} from "./parse";
import {saveFile} from "./save";

interface Arguments {
    path: string,
    out?: string,
    typescript?: boolean,
    component?: string,
    directory?: string,
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
        component: {
            type: "string",
            alias: "c",
            description: "React component name",
            default: "SVG"
        },
        directory: {
            type: "string",
            alias: "d",
            description: "Directory name for generated SVG component",
            default: "svg"
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
    .parse();

const run = (): void => {
    const {path, out, typescript, directory, propTypes, jsx} = argv;
    let {component} = argv;

    const inputPath = join(process.cwd(), path);
    const outputPath = join(process.cwd(), out || "", directory.toLowerCase());

    const ext = extension(typescript, jsx);

    const withExtension = (value: string) => `${value}.${ext}`;

    if (!Validate.Path(inputPath)) return;
    if (!Validate.Name(component)) return;

    component = capitaliseFirst(component);

    createList(inputPath).then((data: IIconList) => {
        logger.info(`Created list with ${Object.keys(data).length} items`);

        const contents = getTemplate(data, component, typescript, propTypes);
        saveFile(outputPath, withExtension("index"), contents);

        const types = getTypesTemplate(data, component, typescript);
        saveFile(outputPath, withExtension("types"), types);
    })
};

run();
