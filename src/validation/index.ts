import {buildPathObject} from "../util";
import {validateInput, validateName, validateOutput} from "./helpers";

export const validate = (argv: any) => new Promise<Args>((resolve, reject) => {
    validateName(argv.name, reject);
    validateInput(argv.input, reject);
    validateOutput(argv.output, reject);

    const input = buildPathObject(argv.input);
    const output = buildPathObject(argv.output);

    const {
        name,
        typescript = false,
        nojsx,
        propTypes = false
    } = argv;

    resolve({
        input,
        output,
        name,
        typescript,
        jsx: nojsx !== true,
        propTypes
    });
});
