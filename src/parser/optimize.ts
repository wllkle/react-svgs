import {optimize, OptimizeOptions} from "svgo";

import {log} from "../log";

export const optimizeSVG = (value: SVGFile): void => {
    try {
        const result = optimize(value.data, options);

        if (!!result && "data" in result) {
            value.data = result.data;
        }
        return;
    } catch (e) {
        log.error(`Failed while optimizing SVG ${value.name.camel}`);
    }
};

const options: OptimizeOptions = {
    plugins: [
        {name: "removeViewBox", active: false},
        {name: "removeDimensions", active: true},
        {name: "minifyStyles", active: true}
    ]
};
