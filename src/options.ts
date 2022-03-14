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

// TODO: implement recursive (tree of svg directories)
// recursive: {
//     type: "boolean",
//     alias: "r",
//     description: "Recursively run through directories from path",
//     default: false
// }
