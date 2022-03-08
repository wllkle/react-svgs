import {INode, parse as svgson} from "svgson";

export const parse = (data: SVGItem): Promise<SVGData> => {
    return new Promise((resolve, reject) => {
        svgson(data.data, {
            camelcase: true
        }).then((res: INode) => {
            console.log(JSON.stringify(res, null, 4))
            resolve({
                name: data.name,
                element: removeEmptyAttributes(res)
            })
        }).catch(error => {
            reject(error);
        });
    })

}

const removeEmptyAttributes = (node: INode): SVGNode => {
    return {

    };

    node.children.map(child => {
        const {attributes, children} = child;

        if (Object.keys(attributes).length === 0) {
            delete child["attributes"];
        }

        if (children?.length === 0) {
            delete child["children"];
        } else {
            removeEmptyAttributes(child.children);
        }

        return child;
    })
}
