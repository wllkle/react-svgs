#!/usr/bin/env node

import {listAllSVG, saveFile} from "./io";
import {parseList} from "./parser";
import {parseArgs} from "./args";
import {getTemplatedFile} from "./templates";
import {buildFileName} from "./util";
import log from "./log";

const run = (args: UnparsedArgs): void => {
    parseArgs(args)
        .then((args: SVGArgs) => {
            const {input, output, name, typescript, jsx, propTypes} = args;

            const fileList: SVGFile[] = listAllSVG(input);

            parseList(fileList).then((result: SVGList) => {
                const options = {name, result, typescript, propTypes};

                const component = getTemplatedFile("component", options);
                saveFile(output, buildFileName("index", typescript, jsx), component);

                const types = getTemplatedFile("types", options);
                saveFile(output, buildFileName("types", typescript), types);
            });
        }).catch(log.error);
};

export default run
