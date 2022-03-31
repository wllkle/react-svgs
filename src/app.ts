import {fileExists, listAllSVG, saveFile} from "./io";
import {parseList} from "./parser";
import {getTemplatedFile} from "./templates";
import {buildFileMeta} from "./util";
import {blue, log} from "./log";

export const run = (args: Args): void => {
    const {input, output, name, typescript, force, jsx, propTypes} = args;
    const fileList: SVGFile[] = listAllSVG(input);

    parseList(fileList).then((result: SVGList) => {
        const options = {name, result, typescript, propTypes};

        const componentFile = buildFileMeta("component", output, typescript, jsx);
        const componentExists = fileExists(componentFile);

        if (!componentExists || force) {
            if (componentExists && force) log.warn(`Component file ${blue(componentFile.name)} exists, it will be overwritten`);

            const component = getTemplatedFile(componentFile, options);
            saveFile(component);
        } else {
            log.info(`Component file ${blue(componentFile.name)} already exists, to overwrite run with the force (-f) flag`);
        }

        const typesFile = buildFileMeta("types", output, typescript);
        const types = getTemplatedFile(typesFile, options);
        saveFile(types);
    }).catch(log.error);
};
