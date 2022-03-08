import {readdirSync, readFileSync} from "fs"
import {extname, join} from "path";
import {parse as parseSvg} from "svgson";

import {IIconList, INode} from "./interfaces"
import {buildNameObj, getStyleObject} from "./strings"
import {logger} from "./logger";

export const createList = (directory: string): Promise<IIconList> => {
    return new Promise<IIconList>((resolve, reject) => {
        const iconList: IIconList = {};
        const allFiles: string[] = readdirSync(directory).filter((file: string) => extname(file) === ".svg");

        allFiles.forEach((file, i) => {
            const filePath = join(directory, file);
            const fileData = readFileSync(filePath).toString();
            const name = buildNameObj(file);

            parseSvg(fileData).then((result: any) => {
                const {attributes} = result;
                const {viewBox, xmlns} = attributes;
                let {children} = result

                const xlink = attributes["xmlns:xlink"] || undefined;

                children = parseChildren(children)

                iconList[name.camel] = {
                    name: name.hyphen,
                    viewBox,
                    element: children,
                    ...(xmlns) && {xmlns},
                    ...(xlink) && {xmlnsXlink: xlink},
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
                const val = attributes[attr];
                const nameObj = buildNameObj(attr);
                delete attributes[attr];
                attributes[nameObj.camel] = val;
            }

            if (attr === "class") {
                const val = attributes[attr];
                delete attributes[attr];
                attributes["className"] = val;
            } else if (attr === "style") {
                const val = attributes[attr];
                attributes[attr] = getStyleObject(val);
            }
        });

        return {
            name,
            type,
            ...(value !== "") && {value},
            ...(Object.keys(attributes).length > 0) && {attributes},
            ...(children?.length > 0) && {children},
        };
    });
}

const printableElements: string[] = ["title", "desc", "style", "tspan"];
