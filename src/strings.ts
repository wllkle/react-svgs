export interface IIconName {
    camel: string,
    hyphen: string
}

export const DEFAULT_XMLNS = "";
export const DEFAULT_XLINK = "";

export const capitaliseFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getNameObj = (str: string): SVGName => {

    str = str.replace(".svg", "").toLowerCase();
    const words = str.split(/\W/g);
    const hyphen = words.join("-");
    const firstWord = words.shift();

    return {
        camel: firstWord + words.map(capitaliseFirst).join(""),
        hyphen
    };
};
export const buildNameObj = (str: string): IIconName => {

    str = str.replace(".svg", "").toLowerCase();
    const words = str.split(/\W/g);
    const hyphen = words.join("-");
    const firstWord = words.shift();

    return {
        camel: firstWord + words.map(capitaliseFirst).join(""),
        hyphen
    };
};

export const getStyleObject = (value: string) => {
    const style = {};

    value.split(";").forEach(el => {
        const [property, value] = el.split(":");
        if (!property) return;

        const formattedProperty = buildNameObj(property.trim()).camel;
        style[formattedProperty] = value.trim();
    });

    return style;
};

export const extension = (typescript: boolean, jsx: boolean) => {
    let ext = typescript ? "ts" : "js";
    if (jsx) ext += "x";
    return ext;
}
