declare global {
    interface CLIArgs {
        path: string,
        out: string,
        typescript?: boolean,
        component?: string,
        directory?: string,
        jsx?: boolean,
        propTypes?: boolean,
        // recursive?: boolean
    }

    interface SVGArgs {
        input: string,
        output: {
            index: string,
            types: string
        },
        name: string,
        typescript: boolean,
        propTypes: boolean
    }

    interface SVGName {
        camel: string,
        hyphen: string
    }

    interface SVGFile {
        name: SVGName,
        data: string
    }

    type SVGAttributes = Record<string, string | object>

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

export {};
