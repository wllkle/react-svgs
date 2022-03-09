import {join} from "path";

import {logger} from "../logger";

export const parseArgs = (args: CLIArgs) => new Promise<SVGArgs>((resolve, reject) => {
    const {path, out, directory, component} = args;

    const cwd: string = process.cwd();

    const outputPath = join(cwd, out.trim(), directory.trim());

    const name = component.trim();
    const typescript = !!args.typescript;
    const propTypes = !!args.propTypes;
    const input = join(cwd, path.trim());

    const ext: string = typescript ? "ts" : "js";
    const fullExt: string = !!args.jsx ? ext + "x" : ext;


    const output = {
        index: join(outputPath, `index.${fullExt}`),
        types: join(outputPath, `types.${ext}`)
    };

    // trim path, out, component and directory,


    const invalid = (message: string) => {
        logger.error(message);
        reject();
    }

    resolve({input, output, name, typescript, propTypes});
})
