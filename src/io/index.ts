import {Dirent, mkdir, readdirSync, readFileSync, writeFile} from "fs";
import {extname, join} from "path";

import {getNameObj} from "../util";
import {logger} from "../logger";

const getDirName = require("path").dirname

export const listAllSVG = (path: PathObject): SVGFile[] => {
    const files: SVGFile[] = readdirSync(path.full, {
        withFileTypes: true
    }).map((file: Dirent) => {
        if (file.isFile() && extname(file.name) === ".svg") {
            return {
                name: getNameObj(file.name),
                data: readFileSync(join(path.full, file.name)).toString()
            };
        }
    }).filter(file => !!file);

    logger.info(`Found ${files.length} SVGs in ${logger.colors.blue(path.short)}`);
    return files;
}

export const saveFile = (path: PathObject, name: string, contents: string) => {
    const fullPath = join(path.full, name);

    mkdir(getDirName(fullPath), {recursive: true}, (err) => {
        if (err) {
            logger.error(err.message);
            return;
        }

        writeFile(fullPath, contents, err => {
            if (err) {
                logger.error(err.message);
                return;
            }

            logger.info(`Saved file ${logger.colors.blue(path.short + "/" + name)}`);
        })
    })
}
