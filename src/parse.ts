import {readdirSync, readFileSync} from "fs"
import {extname, join} from "path";
import {parse as parseSvg} from "svgson";

import {IIconList, INode} from "./interfaces"
import {buildNameObj} from "./strings"
import {logger} from "./logger";
import {underline} from "cli-color";

export const createList = (directory: string): Promise<IIconList> => {
    return new Promise<IIconList>((resolve, reject) => {
        const iconList: IIconList = {};
        const allFiles: string[] = readdirSync(directory).filter((file: string) => extname(file) === ".svg");

        allFiles.forEach(file => {
            const filePath = join(directory, file);
            const fileData = readFileSync(filePath).toString();
            const name = buildNameObj(file);

            parseSvg(fileData).then((result: any) => {
                const {attributes} = result;
                const {viewBox} = attributes;
                let {children} = result

                children = parseChildren(children)

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

const parseChildren = (children: INode[]) => {
    return children.map(child => {
        let {name, value, type, attributes, children} = child;

        if (printableElements.includes(name)) {
            type = "print";

            if (children.length > 0) {
                value = children[0].value;
            } else {
                value = "";
            }

            children = []
        } else {
            value = undefined;
            children = parseChildren(children);
        }

        Object.keys(attributes).forEach(attr => {
            if (attr.includes("-")) {
                const value = attributes[attr];
                const nameObj = buildNameObj(attr);
                delete attributes[attr];
                attributes[nameObj.camel] = value;
            }

            if (attr === "class") {
                const value = attributes[attr];
                delete attributes[attr];
                attributes["className"] = value;
            }
        });


        return {...child, type, value, attributes, children};
    });
}

const printableElements: string[] = ["title", "style"];
