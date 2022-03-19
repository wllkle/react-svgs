import {listAllSVG, saveFile} from "./io";
import {parseList} from "./parser";
import {getTemplatedFile} from "./templates";
import {buildFileName} from "./util";
import {log} from "./log";

export const run = (args: Args): void => {
    const {input, output, name, typescript, jsx, propTypes} = args;
    const fileList: SVGFile[] = listAllSVG(input);

    parseList(fileList).then((result: SVGList) => {
        const options = {name, result, typescript, propTypes};

        const component = getTemplatedFile("component", options);
        const componentFile = buildFileName("index", typescript, jsx);
        saveFile(output, componentFile, component);

        const types = getTemplatedFile("types", options);
        const typesFile = buildFileName("types", typescript);
        saveFile(output, typesFile, types);
    }).catch(log.error);
};
