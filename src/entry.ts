import yargs from "yargs";

import {validate} from "./arg";
import log from "./log";

const options: CLIOptions = {
    file: {
        type: "boolean",
        alias: "f",
        description: "Load config from file.",
        default: false
    },

    path: {
        type: "string",
        alias: "p",
        description: "Path to directory containing SVG files",
    },
    out: {
        type: "string",
        alias: "o",
        description: "Output path (directories will be created)"
    },
    name: {
        type: "string",
        alias: "n",
        description: "React component name",
        default: "SVG"
    },
    typescript: {
        type: "boolean",
        alias: "t",
        description: "Output TypeScript files",
        default: false
    },
    nojsx: {
        type: "boolean",
        alias: "j",
        description: "Use JSX file extensions (.jsx, .tsx)",
        default: false
    },
    absolute: {
        type: "boolean",
        alias: "a",
        description: "Use absolute paths instead of relative.",
        default: false
    },
    "prop-types": {
        type: "boolean",
        description: "Generate PropTypes definition for component",
        default: false
    }
};

yargs(process.argv.slice(2))
    .pkgConf("svg")
    .options(options)
    .check(validate)
    .parseAsync()
    .then(res => log.info(JSON.stringify(res)))
    .catch(log.warn);

