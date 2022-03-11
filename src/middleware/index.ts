import {InferredOptionTypes} from "yargs";
import {componentLink} from "../constants";

export const validation = (args: InferredOptionTypes<CLIArgs>) => {
    const {
        name = ""
    } = args;

    validateName(name)

    console.log("middleware")
    console.log(args);
    return true;
};

const onlyLetters: RegExp = /^[A-Za-z]+$/;

const validateName = (name: string) => {
    if (name.length === 0) throw new Error("Component name cannot be empty.");
    if (!onlyLetters.test(name)) throw new Error("Component name must only contain alphabetic characters.");
    if (name[0] === name[0].toLowerCase()) throw new Error("Component name must begin with a capital letter, see: " + componentLink)
};
