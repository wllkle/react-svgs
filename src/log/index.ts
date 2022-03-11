import cli from "cli-color";

export const cyan = cli.cyanBright;
export const yellow = cli.yellowBright;
export const red = cli.redBright;
export const blue = cli.blueBright;

const app = (color, message?: any): string => `[${color("react-svgs")}] ${typeof message === "string" ? message : "Data\n" + JSON.stringify(message, null, 4)}`;

const log = {

    info: (message?: any) => console.info(app(cyan, message)),
    warn: (message?: any) => console.warn(app(yellow, message)),
    error: (message?: any) => console.warn(app(red, message))
}

export default log;
