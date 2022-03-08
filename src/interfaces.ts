export interface INode {
    name: string,
    type: string,
    value: string,
    attributes: object,
    children: INode[]
}

export interface IIcon {
    name: string,
    viewBox: string,
    xmlns?: string,
    xlink?: string,
    element: INode[]
}

export interface IIconList {
    [key: string]: IIcon
}
