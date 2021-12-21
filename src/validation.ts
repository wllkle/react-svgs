import {existsSync} from "fs";

import {logger, highlight} from "./logger";

export const validatePath = (value): boolean => {
    if (!existsSync(value)) {
        logger.error(`Path does not exist ${highlight(value)}`)
        return false
    }
    return true
}
