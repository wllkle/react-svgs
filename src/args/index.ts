import {validateName, validatePath} from "./validators";
import {logger} from "../logger";
import {buildPathObject} from "../util";

export const parseArgs = (args: UnparsedArgs) => new Promise<SVGArgs>((resolve, reject) => {

    // TODO: start from here
    // TODO: fix README

    const {input: inputPath, output: outputPath} = args;
    let {name = ""} = args;

    name = name.trim();
    const typescript = args.typescript || true;
    const propTypes = !!args.propTypes;
    const jsx = args.jsx || true;

    const input = buildPathObject(inputPath);
    const output = buildPathObject(outputPath);

    const svgArgs: SVGArgs = {input, output, name, typescript, jsx, propTypes};

    validateArgs(svgArgs)
        .then(() => resolve(svgArgs))
        .catch(reason => {
            logger.error(reason);
            reject();
        })
});

const validateArgs = (args: SVGArgs) => new Promise((resolve, reject) => {
    if (!validateName(args.name)) {
        reject("Name must only contain letters; no numbers, spaces or special characters");
        return;
    }

    if (!validatePath(args.input)) {
        reject(`No path exists at ${logger.colors.blue(args.input.short)}, please correct this and try again`);
        return;
    }

    if (!validatePath(args.output)) {
        // not an error
        logger.warn(`No path exists at ${logger.colors.blue(args.output.short)}, directories will be created`);
    }

    resolve("");
});
