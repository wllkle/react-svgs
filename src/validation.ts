import {existsSync} from "fs";

import {logger, highlight} from "./logger";

export const validatePath = (value: string): boolean => {
    if (!existsSync(value)) {
        logger.error(`Path does not exist ${highlight(value)}`)
        return false
    }
    return true
}

export const validateName = (value: string): boolean => {
    return /^[a-zA-Z]+$/.test(value)
}
