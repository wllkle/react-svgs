import {optimize, OptimizeOptions} from "svgo";
import {logger} from "../logger";

export const optimizeSVG = (value: SVGFile): void => {
    try {
        const result = optimize(value.data, options);

        if (!!result && "data" in result) {
            value.data = result.data;
        }
        return;
    } catch (e) {
        logger.error(`Error occurred optimizing SVG ${value.name.camel}.`);
    }
};

const options: OptimizeOptions = {
    plugins: [
        {name: "removeViewBox", active: false},
        {name: "removeDimensions", active: true},
        {name: "minifyStyles", active: true}
    ]
};
