import {mkdir, writeFile} from "fs"

const getDirName = require("path").dirname

import {logger} from "./logger"

export const saveFile = (path: string, contents: string) => {
    mkdir(getDirName(path), {recursive: true}, (err) => {
        if (err) {
            logger.error(err.message)
            return
        }

        writeFile(path, contents, err => {
            if (err) {
                logger.error(err.message)
                return
            }

            logger.info("Icons generated")
        })
    })
}
