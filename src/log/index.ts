import cli from "cli-color";

export const yellow = cli.yellowBright;
export const red = cli.redBright;
export const blue = cli.blueBright;
export const green = cli.greenBright;

const app = (color): string => `[${color("react-svgs")}]`;

export const log = {
    debug: (object?: object) => console.debug(app(green), "\n", JSON.stringify(object, null, 4)),
    info: (message?: any) => console.info(app(blue), message),
    warn: (message?: any) => console.warn(app(yellow), message),
    error: (message?: any) => console.warn(app(red), message)
};
