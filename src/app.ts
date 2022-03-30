import {listAllSVG, saveFile} from "./io";
import {parseList} from "./parser";
import {getTemplatedFile} from "./templates";
import {buildFileName, fileExists} from "./util";
import {blue, log} from "./log";

export const run = (args: Args): void => {
    const {input, output, name, typescript, force, jsx, propTypes} = args;
    const fileList: SVGFile[] = listAllSVG(input);

    parseList(fileList).then((result: SVGList) => {
        const options = {name, result, typescript, propTypes};

        const componentFile = buildFileName("index", typescript, jsx);
        const componentExists = fileExists(output, componentFile);
        if (!componentExists || force) {
            if(componentExists && force) log.warn(`Component file ${blue(componentFile)} exists, it will be overwritten`)
            const component = getTemplatedFile("component", options);
            saveFile(output, componentFile, component);
        } else {
            log.info(`Component file ${blue(componentFile)} already exists, to overwrite run with the force (-f) flag`);
        }

        const types = getTemplatedFile("types", options);
        const typesFile = buildFileName("types", typescript);
        saveFile(output, typesFile, types);
    }).catch(log.error);
};
