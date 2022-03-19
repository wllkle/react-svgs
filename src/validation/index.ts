import {buildPathObject} from "../util";
import {validateInput, validateName, validateOutput} from "./helpers";

export const validate = (argv: any) => new Promise<Args>((resolve, reject) => {
    const name: string = parseStringArg(argv.name);
    const inputStr: string = parseStringArg(argv.input);
    const outputStr: string = parseStringArg(argv.output);

    validateName(name, reject);
    validateInput(inputStr, reject);
    validateOutput(outputStr, reject);

    const input = buildPathObject(inputStr);
    const output = buildPathObject(outputStr);

    const {
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

const parseStringArg = (arg: any): string => {
    let result = arg;
    if (Array.isArray(arg)) {
        result = arg[arg.length - 1];
    }

    return result.toString().trim();
};
