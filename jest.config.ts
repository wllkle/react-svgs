import type {Config} from "@jest/types";

const config: Config.InitialOptions = {
    collectCoverage: true,
    coverageReporters: [
        "json-summary"
    ],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest'
    }
};

export default config;
