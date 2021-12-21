import {readdirSync, readFileSync} from "fs"
import {extname, join} from "path";
import {parse as parseSvg} from "svgson";

import {IIconList} from "./interfaces"
import {buildNameObj} from "./strings"
import {logger} from "./logger";

export const createList = (directory: string): Promise<IIconList> => {
    return new Promise<IIconList>((resolve, reject) => {
        const iconList: IIconList = {};
        const allFiles: string[] = readdirSync(directory).filter((file: string) => extname(file) === ".svg");

        allFiles.forEach(file => {
            const filePath = join(directory, file);
            const fileData = readFileSync(filePath).toString();
            const name = buildNameObj(file);

            parseSvg(fileData).then((result: any) => {
                const {attributes, children} = result;
                const {viewBox} = attributes;

                iconList[name.camel] = {
                    name: name.hyphen,
                    viewBox,
                    element: children
                };
            }).catch((error: any) => {
                logger.error(error.message)
                reject(error)
            });
        });

        resolve(iconList);
    });
};

