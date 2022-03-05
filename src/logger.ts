import cli from "cli-color"

const info = cli.cyanBright
const error = cli.redBright

export const highlight = cli.yellowBright

const APP_NAME = (color) => `[${color("react-scripts-svg")}]`

export const logger = {
    info: (message) => console.info(APP_NAME(info), message),
    error: (message) => console.error(APP_NAME(error), "Error:", message),
    warn: (message) => console.warn(APP_NAME(highlight), message)
}
