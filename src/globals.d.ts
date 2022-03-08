export {};

declare global {
    interface SVGName {
        camel: string,
        hyphen: string
    }

    interface SVGItem {
        name: SVGName,
        path: string,
        data?: string
    }

    interface SVGNode {
        name: string,
        type: string,
        value: string,
        attributes?: Record<string, string>,
        children?: SVGNode[]
    }

    interface SVGData {
        name: SVGName,
        element: SVGNode
    }
}
