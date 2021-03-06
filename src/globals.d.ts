export {};

declare global {
    type SVGAttributes = Record<string, string | object>;

    type TemplatedFileType = "component" | "types";

    interface TemplateMeta {
        name: string,
        path: string,
        type: TemplatedFileType
    }

    interface TemplateFile {
        meta: TemplateMeta,
        data: string
    }

    interface Args {
        input: PathObject,
        output: PathObject,
        name: string,
        typescript: boolean,
        jsx: boolean,
        propTypes: boolean,
        force: boolean
    }

    interface PathObject {
        full: string,
        short: string
    }

    interface SVGName {
        camel: string,
        hyphen: string
    }

    interface SVGFile {
        name: SVGName,
        data: string
    }

    interface SVGNode {
        name: string,
        type: string,
        value?: string,
        attributes?: SVGAttributes,
        children?: SVGNode[]
    }

    interface SVGData {
        name: SVGName,
        element: SVGNode
    }

    interface SVGList {
        [key: string]: {
            name: string,
            attributes?: SVGAttributes,
            children: SVGNode[]
        };
    }
}
