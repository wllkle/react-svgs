import {InferredOptionTypes, Options} from "yargs";

declare global {
    interface CLIOptions {
        [key: string]: Options
    }

    interface UnparsedArgs {
        [key: string]: any
    }

    interface CLIArgs extends InferredOptionTypes<CLIOptions> {
        file?: string,
        path?: string,
        out?: string,
        typescript?: boolean,
        name?: string,
        component?: string,
        directory?: string,
        jsx?: boolean,
        nojsx?: boolean,
        propTypes?: boolean,
        absolute?: boolean,
        // recursive?: boolean
    }

    interface PathObject {
        full: string,
        short: string
    }

    interface SVGArgs {
        input: PathObject,
        output: PathObject,
        name: string,
        typescript: boolean,
        jsx: boolean,
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
