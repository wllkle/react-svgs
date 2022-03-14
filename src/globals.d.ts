export {}

declare global {
    type SVGAttributes = Record<string, string | object>;

    interface Args {
        input: PathObject,
        output: PathObject,
        name: string,
        typescript: boolean,
        jsx: boolean,
        propTypes: boolean
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
        }
    }
}
