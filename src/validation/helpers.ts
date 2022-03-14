import {existsSync, lstatSync} from "fs";
import {join, sep} from "path";

import {buildPathObject} from "../util";
import log, {blue} from "../log";

type RejectFn = (message: string) => void;

export const validateName = (value: any, reject: RejectFn) => {
    if (!isString(value)) reject("Component name must be a string");

    const nameString = value.toString();

    if (nameString.length === 0) reject("Component name cannot be empty");
    if (!alphaOnly.test(nameString)) reject("Component name must only contain alphabetic characters");
    if (nameString[0] === nameString.toLowerCase()) reject("Component name must begin with a capital letter");
};

export const validateInput = (value: any, reject: RejectFn) => {
    if (!value) reject("Input path cannot be null");
    if (!isString(value)) reject("Input path must be a string");

    const testObj = buildPathObject(value);

    if (!existsSync(testObj.full)) reject("Input path does not exist");
    if (pathContainsPackageJson(testObj.full)) reject("Input path is project root");
};

export const validateOutput = (value: any, reject: RejectFn) => {
    if (!value) reject("Output path cannot be null");
    if (!isString(value)) reject("Output path must be a string");

    const testObj = buildPathObject(value);

    if (existsSync(testObj.full)) log.warn(`Output path ${blue(testObj.short)} exists, files will be overwritten`);
    if (pathContainsPackageJson(testObj.full)) reject("Output path cannot be the project root");
};

const alphaOnly: RegExp = /^[A-Za-z]+$/;
const isString = (value: any) => typeof value === "string" || value instanceof String;
const pathContainsPackageJson = (path: string) => {
    try {
        if (lstatSync(path).isFile()) {
            const pathParts = path.split(sep);
            pathParts.pop();
            path = pathParts.join(sep);
        }

        return existsSync(join(path, "package.json"));
    } catch (e) {
        return false;
    }
};