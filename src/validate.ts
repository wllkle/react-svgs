import {existsSync} from "fs";

import {highlight, logger} from "./logger";

export const Validate = {
    Path: (value: string): boolean => {
        const valid = existsSync(value);
        if (!valid) logger.error(`Path does not exist ${highlight(value)}`)
        return valid;
    },
    Name: (value: string): boolean => {
        const valid = /^[a-zA-Z]+$/.test(value);
        if (!valid) logger.error(`"${highlight(value)}" is not a valid name`);
        return valid;
    }
}
