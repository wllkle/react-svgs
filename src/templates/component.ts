import {WARNING_COMMENT} from "../util";

export const componentTemplate = (
    content: SVGList,
    name: string,
    typescript: boolean,
    propTypes: boolean
): string => {
    const ts = (value: string) => typescript ? value : "";

    return `${WARNING_COMMENT}

${ts("// @ts-nocheck")}

import React${ts(", {ReactNode, CSSProperties}")} from "react";${propTypes ? `\nimport PropTypes from "prop-types";` : ""}
import {data${propTypes ? `, ${name}TypesArray` : ""}${ts(`, ${name}Types, INode`)}} from "./types";${ts(`\n\ninterface ${name}Props {
    name: ${name}Types,
    className?: string,
    style?: CSSProperties
}`)}

const renderChildNodes = (nodes${ts(": INode[]")})${ts(": ReactNode")} => (
    <>
        {nodes.map((node${ts(": INode")}) => {
            const {name, attributes = {}, type, value, children = []} = node;
            const Tag = name.toString();
            const id = Math.random().toString(36);

            if (type === "print") return (<Tag key={id}>{value}</Tag>);

            return (<Tag key={id} {...attributes}>{renderChildNodes(children)}</Tag>);
        })}
    </>
);

export const ${name} = (props${ts(`: ${name}Props`)}) => {
    const {name, className = undefined, style = undefined} = props;
    const iconData = data[name] ? data[name] : undefined;
    const {attributes, children} = iconData || {};

    const svgProps = {
        ...attributes,
        ...(className) && {className},
        ...(style) && {style},
        ...(children) && {children: renderChildNodes(children)}
    };

    return (<svg {...svgProps}/>);
}${propTypes ? `\n\n${name}${getPropTypes}` : ""}

export default ${name};
export {${name}TypesArray} from "./types";${ts(`\nexport type {${name}Types};`)}
`;
}

const getPropTypes: string = `.propTypes = {
    name: PropTypes.oneOf(IconTypesArray),
    className: PropTypes.string,
    style: PropTypes.object
}`
