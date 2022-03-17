import type {Config} from "@jest/types";

const config: Config.InitialOptions = {
    collectCoverage: true,
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest'
    }
};

export default config;
