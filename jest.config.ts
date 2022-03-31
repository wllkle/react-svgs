import type {Config} from "@jest/types";

const config: Config.InitialOptions = {
    collectCoverage: true,
    coverageReporters: [
        "json-summary",
        "lcov"
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest"
    }
};

export default config;
