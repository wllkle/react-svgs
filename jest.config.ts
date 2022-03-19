import type {Config} from "@jest/types";

const config: Config.InitialOptions = {
    collectCoverage: true,
    coverageReporters: [
        "json-summary",
        "lcov"
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest"
    }
};

export default config;
