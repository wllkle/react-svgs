import yargs from "yargs";

// import {options} from "./options";
import {validation} from "./middleware";

const options: CLIOptions = {
    file: {
        type: "boolean",
        alias: "f",
        description: "Load config from file.",
        default: false,

    },
    path: {
        type: "string",
        alias: "p",
        description: "Path to directory containing SVG files"
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
    name: {
        type: "string",
        alias: "n",
        description: "React component name",
        default: "SVG"
    },
    directory: {
        type: "string",
        alias: "d",
        description: "Directory name for generated SVG component",
        default: "svg"
    },
    nojsx: {
        type: "boolean",
        alias: "j",
        description: "Use JSX file extensions (.jsx, .tsx)",
        default: false
    },
    propTypes: {
        type: "boolean",
        alias: "pt",
        description: "Generate PropTypes definition for component",
        default: false
    }
};

yargs(process.argv.slice(2))
    .options(options)
    .check(validation)
    .parseAsync()
    .then(console.log)
    .catch(console.error);


