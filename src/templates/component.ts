import {WARNING_COMMENT} from "../constants";

export const componentTemplate = (
    content: SVGList,
    name: string,
    typescript: boolean,
    propTypes: boolean
): string => {
    const ts = (value: string) => typescript ? value : "";

    return `${WARNING_COMMENT}
${ts("\n// @ts-nocheck\n")}
import React${ts(", {ReactNode, CSSProperties}")} from "react";${propTypes ? `\nimport PropTypes from "prop-types";` : ""}
import {data${propTypes ? `, ${name}TypesArray` : ""}${ts(`, ${name}Types, INode`)}} from "./types";${ts(`\n\ninterface ${name}Props {
    name?: ${name}Types,
    className?: string,
    style?: CSSProperties
}`)}

export const ${name} = (props${ts(`: ${name}Props`)}) => {
    const {name, className, style} = props;
    const {attributes, children} = data[name] || {};

    const svgProps = {
        ...(attributes) && {...attributes},
        ...(className) && {className},
        ...(style) && {style},
        ...(children) && {children: renderChildNodes(children)}
    };

    return (<svg {...svgProps}/>);
};${propTypes ? getPropTypes(name) : ""}

const renderChildNodes = (nodes${ts(": INode[]")})${ts(": ReactNode")} => (
    <>
        {nodes.map((node${ts(": INode")}, index${ts(": number")}) => {
            const {name, attributes = {}, type, value, children = []} = node;
            const Tag = name.toString();

            if (type === "print") return (<Tag key={index}>{value}</Tag>);

            return (<Tag key={index} {...attributes}>{renderChildNodes(children)}</Tag>);
        })}
    </>
);

export default ${name};
export {${name}TypesArray} from "./types";${ts(`\nexport type {${name}Types};`)}
`;
};

const getPropTypes = (name: string): string => `\n\n${name}.propTypes = {
    name: PropTypes.oneOf(${name}TypesArray),
    className: PropTypes.string,
    style: PropTypes.object
};`;
