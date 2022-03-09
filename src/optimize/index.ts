import {optimize, OptimizeOptions} from "svgo";

export const optimizeSVG = (value: SVGFile): void => {
    const result = optimize(value.data, options);

    if ("data" in result) {
        value.data = result.data;
    } else {
        throw new Error(`Error occurred optimizing SVG.`)
    }
}

const options: OptimizeOptions = {
    plugins: [
        {name: "removeViewBox", active: false},
        {name: "removeDimensions", active: true}
    ]
}
