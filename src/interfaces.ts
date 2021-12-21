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
    element: INode[]
}

export interface IIconList {
    [key: string]: IIcon
}
