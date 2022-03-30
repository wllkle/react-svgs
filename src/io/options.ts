import {Options} from "yargs";

export const opts: { [key: string]: Options } = {
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
        alias: ["t", "ts", "typeScript"],
        description: "Output TypeScript files",
        default: false
    },
    force: {
        type: "boolean",
        alias: ["f"],
        description: "Overwrite existing component file",
        default: false
    },
    noJsx: {
        type: "boolean",
        alias: ["nojsx", "no-jsx"],
        description: "Use JSX file extensions (.jsx, .tsx)",
        default: false
    },
    propTypes: {
        type: "boolean",
        alias: ["proptypes", "prop-types"],
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
