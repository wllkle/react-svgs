import {Dirent, mkdir, readdirSync, readFileSync, writeFile} from "fs";
import {join, parse} from "path";

import {buildNameObject} from "../util";
import {blue, log} from "../log";

const getDirName = require("path").dirname;

export const listAllSVG = (path: PathObject): SVGFile[] => {
    const files: SVGFile[] = readdirSync(path.full, {
        withFileTypes: true
    }).map((file: Dirent) => {
        if (file.isFile()) {
            const {name, ext} = parse(file.name);
            if (ext === ".svg") {
                return {
                    name: buildNameObject(name),
                    data: readFileSync(join(path.full, file.name)).toString()
                };
            }
        }
    }).filter(file => !!file);

    const count = files.length;
    log.info(`Found ${count} SVG${count > 1 ? "s" : ""} in ${blue(path.short)}`);
    return files;
};

export const saveFile = (path: PathObject, name: string, contents: string) => {
    const fullPath = join(path.full, name);

    mkdir(getDirName(fullPath), {recursive: true}, (err) => {
        if (err) {
            log.error(err.message);
            return;
        }

        writeFile(fullPath, contents, err => {
            if (err) {
                log.error(err.message);
                return;
            }

            log.info(`Saved file ${blue(name)}`);
        });
    });
};

export {opts} from "./options";
