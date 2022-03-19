import {INode, parse as svgson} from "svgson";

import {optimizeSVG} from "./optimize";
import {appendToListObject, buildNameObject, buildStyleObject} from "../util";
import {blue, log} from "../log";

export const parseList = (files: SVGFile[]): Promise<SVGList> => {
    const queue: Promise<SVGData>[] = files.map((file: SVGFile) => new Promise<SVGData>((resolve, reject) => {
        optimizeSVG(file);
        parseFile(file).then(resolve).catch(reject);
    }));

    return new Promise<SVGList>((resolve, reject) => {
        let svgList: SVGList = {};
        Promise.allSettled(queue)
            .then(result => {
                result.filter(res => res.status === "fulfilled").forEach(item => {
                    if ("value" in item) svgList = appendToListObject(item.value, svgList);
                });

                result.filter(res => res.status === "rejected").forEach(item => {
                    if ("reason" in item) log.error(item.reason.message);
                });
            })
            .catch(console.error)
            .finally(() => {
                const count = Object.keys(svgList).length;
                if (count > 0) {
                    log.info(`Created list with ${blue(count)} SVGs.`);
                    resolve(svgList);
                } else {
                    reject("Failed to create list of SVGs.");
                }
            });
    });
};

const parseFile = (data: SVGFile): Promise<SVGData> => new Promise((resolve, reject) => {
    svgson(data.data, {
        camelcase: true
    }).then((res: INode) => {
        resolve({
            name: data.name,
            element: parseNode(res)
        });
    }).catch(error => {
        reject(error);
    });
});

const parseNode = (node: INode): SVGNode => {
    let {name, type, value} = node;
    const attributes = parseAttributes(node.attributes);
    let children;

    if (printableElements.includes(name)) {
        type = "print";

        if (node.children.length > 0) {
            value = node.children[0].value;
        } else {
            value = undefined;
        }
    } else {
        children = node.children.length > 0 ? node.children.map(parseNode) : undefined;
    }

    return {
        name,
        type,
        ...(!!value && value !== "") && {value},
        ...(Object.keys(attributes).length > 0) && {attributes},
        ...(children) && {children}
    };
};

const parseAttributes = (attributes: Record<string, string>): SVGAttributes => {
    const result: SVGAttributes = {};

    Object.keys(attributes).forEach(attr => {
        // fixes hyphenated attributes such as "data-name"
        if (attr.includes("-")) {
            const val = attributes[attr];
            const nameObj = buildNameObject(attr);
            result[nameObj.camel] = val;
        } else if (attr === "class") {
            const val = attributes[attr];
            delete attributes[attr];
            attributes["className"] = val;
        } else if (attr === "style") {
            result[attr] = buildStyleObject(attributes[attr]);
        } else {
            result[attr] = attributes[attr];
        }
    });

    return result;
};

const printableElements: string[] = ["title", "desc", "style", "tspan"];
