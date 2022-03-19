import {join, normalize, sep} from "path";

export const buildNameObject = (str: string): SVGName => {
    const capitaliseFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const words = str.trim().toLowerCase().split(/\W/g).filter(s => !!s);
    const hyphen = words.join("-").trim();
    const camel = words.shift() + words.map(capitaliseFirst).join("").trim();

    return {camel, hyphen};
};

export const buildStyleObject = (value: string) => {
    const style = {};

    value.split(";").forEach(el => {
        const [property, value] = el.split(":");
        if (!property) return;

        const prop = buildNameObject(property).camel;
        style[prop] = value.trim();
    });

    return style;
};

export const buildPathObject = (path: string): PathObject => {
    path = normalize(path.trim());

    const cwd: string = process.cwd();
    const shortCwd = cwd.split(sep).pop();

    return {
        full: join(cwd, path),
        short: join(shortCwd, path).split(sep).join("/")
    };
};

export const buildFileName = (name: string, typescript: boolean, jsx: boolean = false): string => {
    const extension = `${typescript ? "t" : "j"}s${jsx ? "x" : ""}`;
    return `${name.trim()}.${extension}`;
};

export const appendToListObject = (data: SVGData, list: SVGList): SVGList => {
    const {camel, hyphen: name} = data.name;
    const {attributes, children} = data.element;

    return {
        ...list,
        [`${camel}`]: {name, attributes, children}
    };
};
