#!/usr/bin/env node

import yargs from "yargs"

interface Arguments {
    [x: string]: unknown,

    path: string,
    out: string,
    defaultExport?: boolean,
    typescript?: boolean,
}

const argv = yargs(process.argv.slice(2))
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
            demandOption: true
        },
        defaultExport: {
            type: "boolean",
            alias: "d",
            description: "Use default exports",
            default: true
        },
        typescript: {
            type: "boolean",
            alias: "t",
            description: "Output TypeScript files",
            default: false
        }
    })
    .parse()

console.log(argv)
