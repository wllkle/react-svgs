import {componentTemplate} from "./component";
import {typesTemplate} from "./types";

interface TemplateOptions {
    result: SVGList,
    name: string,
    typescript: boolean
    propTypes: boolean
}

export const getTemplatedFile = (meta: TemplateMeta, options: TemplateOptions): TemplateFile => {
    const {type} = meta;
    const {result, name, typescript, propTypes} = options;

    if (type === "component") {
        return {
            meta,
            data: componentTemplate(name, typescript, propTypes)
        };
    }
    return {
        meta,
        data: typesTemplate(result, name, typescript)
    };
};
