import {WARNING_COMMENT} from "../util";

export const typesTemplate = (content: SVGList, name: string, typescript: boolean) => {
    const list = clean(content);
    const iconTypes = Object.keys(content).map(key => `"${key}"`);
    const iconTypesArray = iconTypes.join(",\n\t");

    if (typescript) {
        const iconTypesUnion = iconTypes.join(" |\n\t")

        return `${WARNING_COMMENT}

type Attributes = Record<string, string | object>;

export interface INode {
    name: string,
    type: string,
    value?: string,
    attributes?: Attributes,
    children?: INode[]
}

interface I${name}Data {
    [key: string]: {
        name: string,
        attributes?: Attributes,
        children: INode[]
    }
}

export const data: I${name}Data = ${list};

export type ${name}Types = ${iconTypesUnion};

export const ${name}TypesArray: ${name}Types[] = [
    ${iconTypesArray}
];
`;
    }

    return `${WARNING_COMMENT}

export const data = ${list};

export const ${name}TypesArray = [
    ${iconTypesArray}
];
`;
}

const clean = (obj: SVGList): string => {
    const cleaned = JSON.stringify(obj, null, 4);
    return cleaned.replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, match => {
        return match.replace(/"/g, "");
    });
};
