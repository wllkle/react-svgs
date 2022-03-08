import {optimize} from "svgo";

export const optimizeSVG = (value: SVGItem): void => {
    const result = optimize(value.data);

    if ("data" in result) {
        value.data = result.data;
    } else {
        throw new Error(`Error occurred optimizing SVG.`)
    }
}
