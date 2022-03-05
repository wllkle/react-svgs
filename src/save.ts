import {mkdir, writeFile} from "fs"
import {join} from "path"

import {logger} from "./logger"

const getDirName = require("path").dirname

export const saveFile = (path: string, name: string, contents: string) => {
    const savePath = join(path, name);

    mkdir(getDirName(savePath), {recursive: true}, (err) => {
        if (err) {
            logger.error(err.message);
            return;
        }

        writeFile(savePath, contents, err => {
            if (err) {
                logger.error(err.message);
                return;
            }
            logger.info(`Saved file ${name}`);
        })
    })
}
