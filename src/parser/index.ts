import {INode, parse as svgson} from "svgson";

import {optimizeSVG} from "../optimize";
import {SVGDataList} from "../util";
import {logger} from "../logger";
import {getNameObj, getStyleObject} from "../strings";

export const parseList = (files: SVGFile[]): Promise<SVGList> => {
    const queue: Promise<SVGData>[] = files.map((file: SVGFile) => new Promise<SVGData>((resolve, reject) => {
        try {
            optimizeSVG(file);
            parseFile(file).then(resolve).catch(reject);
        } catch (error) {
            reject(error);
        }
    }));

    return new Promise<SVGList>(resolve => {
        const svgDataList = new SVGDataList();
        Promise.all(queue)
            .then((result: SVGData[]) => {
                result.forEach(svgDataList.append)
            })
            .catch(console.error)
            .finally(() => {
                logger.info(`Created list of ${Object.keys(svgDataList.list).length} SVGs`);
                resolve(svgDataList.list)
            });
    });
}

export const parseFile = (data: SVGFile): Promise<SVGData> => {
    return new Promise((resolve, reject) => {
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
}

const parseNode = (node: INode): SVGNode => {
    let {name, type, value} = node;
    const attributes = parseAttributes(node.attributes);
    let children;

    if (printableElements.includes(name)) {
        console.log(name + " is in printableElements")
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
}

const parseAttributes = (attributes: Record<string, string>): SVGAttributes => {
    const result: SVGAttributes = {};

    Object.keys(attributes).forEach(attr => {
        // fixes hyphenated attributes such as "data-name"
        if (attr.includes("-")) {
            const val = attributes[attr];
            const nameObj = getNameObj(attr);
            result[nameObj.camel] = val;
        } else if (attr === "class") {
            const val = attributes[attr];
            delete attributes[attr];
            attributes["className"] = val;
        } else if (attr === "style") {
            result[attr] = getStyleObject(attributes[attr]);
        } else {
            result[attr] = attributes[attr];
        }
    })

    return result;
}

const printableElements: string[] = ["title", "desc", "style", "tspan"];
