import {existsSync} from "fs";

export const validateName = (value: string): boolean => {
    const charOnly: RegExp = /^[A-Za-z]+$/;

    return value.length > 0 && charOnly.test(value);
};

export const validatePath = (value: PathObject): boolean => existsSync(value.full);
