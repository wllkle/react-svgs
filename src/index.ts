#!/usr/bin/env node

import yargs from "yargs"

import {listAllSVG, saveFile} from "./io";
import {parseList} from "./parser";
import {parseArgs} from "./args";
import {getTemplatedFile} from "./templates";

// @ts-ignore
const argv: CLIArgs = yargs(process.argv.slice(2))
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
    parseArgs(argv)
        .then((args: SVGArgs) => {
            const {input, output, name, typescript, propTypes} = args;

            const fileList: SVGFile[] = listAllSVG(input);

            parseList(fileList).then((result: SVGList) => {
                const options = {name, result, typescript, propTypes};

                const component = getTemplatedFile("component", options);
                saveFile(output.index, component);

                const types = getTemplatedFile("types", options);
                saveFile(output.types, types);
            });
        });
};

run();
