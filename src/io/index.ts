import {Dirent, readdirSync, readFileSync} from "fs";
import {extname, join} from "path";

import {buildNameObj} from "../strings";
import {logger} from "../logger";

export const listAllSVG = (path: string): SVGItem[] => {
    const files: SVGItem[] = readdirSync(path, {
        withFileTypes: true
    }).map((file: Dirent) => {
        if (extname(file.name) === ".svg") {
            return {
                name: buildNameObj(file.name),
                path: join(path, file.name)
            };
        }
    });

    logger.info(`Found ${files.length} SVGs`);
    return files;
}

export const readSVG = (data: SVGItem): void => {
    data.data = readFileSync(data.path).toString();
}
