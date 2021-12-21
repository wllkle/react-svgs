import {IIconList} from "./interfaces";

const clean = (obj: object) => {
    const cleaned = JSON.stringify(obj, null, 4);
    return cleaned.replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, match => {
        return match.replace(/"/g, "");
    });
};

export const getTemplate = (
    content: IIconList,
    typescript: boolean,
    componentName: string,
    defaultExport: boolean,
    defaultClassName: string
) => {
    if (typescript) return templateTs(content, componentName, defaultExport, defaultClassName)
    return templateListJs(content)
}

const templateListJs = (content: IIconList) => {
    const iconList = clean(content)

    return `export const iconList = ${iconList};
    `
}

const templateTs = (content: IIconList, componentName: string, defaultExport: boolean, defaultClassName: string): string => {
    const iconList = clean(content)
    const iconTypes = Object.keys(content).map(key => `"${key}"`).join(" |\n\t")

    // prefixed icon string must be generated outside back-ticked string
    const prefixedIconName = "`${DEFAULT_CLASSNAME}-${icon}`"

    return `import React, {CSSProperties} from "react";
    
export type IconTypes = ${iconTypes};

interface IconProps {
    name: IconTypes,
    className?: string | string[],
    style?: CSSProperties
}

interface INode {
    name: string,
    type: string,
    value: string,
    attributes: object,
    children: INode[]
}

interface IIconList {
    [key: string]: {
        name: string,
        viewBox: string,
        element: INode[]
    }
}

const DEFAULT_CLASSNAME = "${defaultClassName}";

${defaultExport ? "" : "export "}const Icon = (props: IconProps) => {
    const {name, className, style} = props;
    const iconData = iconList[name] !== null ? iconList[name] : null;    

    if (iconData) {
        const {viewBox, element} = iconData;
        const classNames = buildClassName(className, iconData.name);

        return (
            svg viewBox={viewBox} className={classNames} style={style}>
                {renderChildNodes(element)}
            /svg>
        );
    }
    
    const classNames = buildClassName(className);
    
    return (
        svg className={classNames} style={style}/>
    );
}

const buildClassName = (className: string | string[], icon: string = ""): string => {
    const classNames = [DEFAULT_CLASSNAME];
    if (icon !== "") {
        classNames.push(${prefixedIconName});
    }
    
    if (Array.isArray(className)) {
        classNames.concat(className);
    } else {
        classNames.push(className);
    }
    
    return classNames.join(" ");
}

const renderChildNodes = (nodes) => (
    <>
        {nodes.map(node => {
            const {name, attributes, children} = node;
            const Tag = name.toString();
            const id = Math.random().toString(36).substring(2, 8);
            
            return (
                <Tag key={id} {...attributes}>{renderChildNodes(children)}</Tag>
            );
        })}
    </>
);

const iconList: IIconList = ${iconList};${defaultExport ? "\n\nexport default Icon" : ""}
`
}
