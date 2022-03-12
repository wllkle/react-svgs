import {Options} from "yargs";


const opts: { [key: string]: Options } = {
    input: {
        type: "string",
        alias: "i",
        description: "Path to directory containing SVG files"
    },
    output: {
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
    absolute: {
        type: "boolean",
        description: "Use absolute paths instead of relative.",
        default: false
    },
    "no-jsx": {
        type: "boolean",
        description: "Use JSX file extensions (.jsx, .tsx)",
        default: false
    },
    "prop-types": {
        type: "boolean",
        description: "Generate PropTypes definition for component",
        default: false
    }
};

export default opts;

export const options: CLIOptions = {
    file: {
        type: "boolean",
        alias: "f",
        description: "Load config from file.",
        default: false,

    },
    path: {
        type: "string",
        alias: "p",
        description: "Path to directory containing SVG files",
        required: false
    },
    out: {
        type: "string",
        alias: "o",
        description: "Output path (directory will be created)",

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
    }
};

// TODO: implement recursive (tree of svg directories)
// recursive: {
//     type: "boolean",
//     alias: "r",
//     description: "Recursively run through directories from path",
//     default: false
// }
