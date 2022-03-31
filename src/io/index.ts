import {Dirent, existsSync, mkdir, readdirSync, readFileSync, writeFile} from "fs";
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

export const saveFile = (file: TemplateFile) => {
    mkdir(getDirName(file.meta.path), {recursive: true}, (err) => {
        if (err) {
            log.error(err.message);
            return;
        }

        writeFile(file.meta.path, file.data, err => {
            if (err) {
                log.error(err.message);
                return;
            }

            log.info(`Saved file ${blue(file.meta.name)}`);
        });
    });
};

export const fileExists = (file: TemplateMeta): boolean => {
    return existsSync(file.path);
};

export {opts} from "./options";
