// import {Options} from "yargs";
import {Options} from "cosmiconfig";

export const cosmiconfigOptions: Options = {
    packageProp: "svg",
    searchPlaces: [
        "package.json",
        "svgrc",
        "svgrc.json",
        "svgrc.yaml",
        "svgrc.yml",
        "svgrc.js",
        "svgrc.cjs",
        "svg.config.js",
        "svg.config.cjs",
    ]
};

export const options: CLIOptions = {
    file: {
        type: "boolean",
        alias: "f",
        description: "Load config from file.",
        default: false
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
    }
};

// TODO: implement recursive (tree of svg directories)
// recursive: {
//     type: "boolean",
//     alias: "r",
//     description: "Recursively run through directories from path",
//     default: false
// }
