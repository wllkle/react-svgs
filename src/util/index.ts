import {join, normalize, sep} from "path";

export class SVGDataList {
    list: SVGList = {};

    append = (data: SVGData) => {
        const {camel, hyphen} = data.name;
        const {attributes, children} = data.element;
        const item = {
            [camel]: {
                name: hyphen,
                attributes,
                children
            }
        };
        this.list = {...this.list, ...item};
    };
}

export const capitaliseFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getNameObj = (str: string): SVGName => {
    console.log("getNameObj", str);
    const dot = ".svg";
    if (str.endsWith(dot)) str = str.substring(0, str.length - dot.length);

    str = str.toLowerCase();
    const words = str.split(/\W/g);

    const hyphen = words.join("-").trim();
    const camel = words.shift() + words.map(capitaliseFirst).join("").trim();

    console.log({camel, hyphen});

    return {camel, hyphen};
};

export const getStyleObject = (value: string) => {
    const style = {};

    value.split(";").forEach(el => {
        const [property, value] = el.split(":");
        if (!property) return;

        const prop = getNameObj(property.trim()).camel;
        style[prop] = value.trim();
    });

    return style;
};

export const buildPathObject = (path: string): PathObject => {
    path = normalize(path.trim());

    return {
        full: join(cwd, path),
        short: join(shortCwd, path).split(sep).join("/")
    };
};

export const buildFileName = (name: string, typescript: boolean, jsx: boolean = false): string => {
    const extension = `${typescript ? "t" : "j"}s${jsx ? "x" : ""}`;
    return `${name.trim()}.${extension}`;
};

export const WARNING_COMMENT: string = `/*
*   DO NOT MAKE CHANGES TO THIS FILE
*   THIS FILE WAS GENERATED BY REACT-SVGS
*   https://github.com/wllkle/react-svgs
*/`;

const cwd: string = process.cwd();
const shortCwd = cwd.split(sep).pop();
