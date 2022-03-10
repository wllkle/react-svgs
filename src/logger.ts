import cli from "cli-color"

const APP_NAME = (color) => `[${color("react-scripts-svg")}]`

export const logger = {
    colors: {
        info: cli.cyanBright,
        error: cli.redBright,
        warn: cli.yellowBright,
        blue: cli.blueBright
    },
    info: (message) => console.info(APP_NAME(logger.colors.info), message),
    error: (message) => console.error(APP_NAME(logger.colors.error), "Error:", message),
    warn: (message) => console.warn(APP_NAME(logger.colors.warn), message)
}
