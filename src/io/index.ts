import {Dirent, readdirSync, readFileSync} from "fs";
import {extname, join} from "path";

import {getNameObj} from "../strings";
import {logger} from "../logger";

export const listAllSVG = (path: string): SVGFile[] => {
    const files: SVGFile[] = readdirSync(path, {
        withFileTypes: true
    }).map((file: Dirent) => {
        if (extname(file.name) === ".svg") {
            return {
                name: getNameObj(file.name),
                data: readFileSync(join(path, file.name)).toString()
            };
        }
    });

    logger.info(`Found ${files.length} SVGs in ${path}`);
    return files;
}
