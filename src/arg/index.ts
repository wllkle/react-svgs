import {existsSync} from "fs";
import {join} from "path";

import {componentLink} from "../constants";
import log, {blue} from "../log";

export const validate = (args: CLIArgs) => {
    log.info("validate");
    log.info(args);

    const {path, out, name, typescript, nojsx, absolute, propTypes} = args;

    validateName(name);
    validatePath(path, absolute);
    validateOutputPath(out, absolute);

    return true;
};

const onlyLetters: RegExp = /^[A-Za-z]+$/;

const validateName = (name: string) => {
    if (name.length === 0) throw new Error("Component name cannot be empty.");
    if (!onlyLetters.test(name)) throw new Error("Component name must only contain alphabetic characters.");
    if (name[0] === name[0].toLowerCase()) throw new Error("Component name must begin with a capital letter, see: " + componentLink)
};

const validatePath = (path: string, absolute: boolean) => {
    const fullPath = absolute ? path : join(cwd, path);
    if (!existsSync(fullPath)) throw new Error(`Path ${blue(path)} does not exist, check this and try again.`)
}

// check output path but don't error
const validateOutputPath = (path: string, absolute: boolean) => {
    const fullPath = absolute ? path : join(cwd, path);
    if (!existsSync(fullPath)) log.warn(`Directory does not exist at ${path}, will be created.`);
}

const cwd = process.cwd();
