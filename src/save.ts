import {mkdir, writeFile} from "fs"
import {join} from "path"

import {logger} from "./logger"

const getDirName = require("path").dirname

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
