import {Dirent, readdirSync, readFileSync, mkdir, writeFile} from "fs";
import {extname, join} from "path";

const getDirName = require("path").dirname

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

export const saveFile = (path: string, contents: string) => {
    mkdir(getDirName(path), {recursive: true}, (err) => {
        if (err) {
            logger.error(err.message);
            return;
        }

        writeFile(path, contents, err => {
            if (err) {
                logger.error(err.message);
                return;
            }
            logger.info(`Saved file to ${path}`);
        })
    })
}
