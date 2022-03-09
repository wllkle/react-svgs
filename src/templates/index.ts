import {componentTemplate} from "./component";
import {typesTemplate} from "./types";

type FileType = "component" | "types";

interface TemplateOptions {
    result: SVGList,
    name: string,
    typescript: boolean
    propTypes: boolean
}

export const getTemplatedFile = (file: FileType, options: TemplateOptions): string => {
    const {result, name, typescript, propTypes} = options;
    let data;

    switch (file) {
        case "component":
            data = componentTemplate(result, name, typescript, propTypes);
            break;
        case "types":
            data = typesTemplate(result, name, typescript);
            break;
        default:
            data = "";
            break;
    }

    return data;
}
