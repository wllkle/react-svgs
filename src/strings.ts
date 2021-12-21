interface IIconName {
    camel: string,
    hyphen: string
}

export const buildNameObj = (str: string): IIconName => {
    const capitaliseFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    str = str.replace(".svg", "").toLowerCase();
    const words = str.split(/\W/g);
    const hyphen = words.join("-");
    const firstWord = words.shift();

    return {
        camel: firstWord + words.map(capitaliseFirst).join(""),
        hyphen
    };
};
