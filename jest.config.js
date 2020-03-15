// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    "moduleFileExtensions": [
        "ts",
        "js"
    ],
    "transform": {
        "^.+\\.ts$": "ts-jest"
    },
    "globals": {
        "ts-jest": {
            "tsConfig": "./tsconfig.json"
        }
    },
    "testMatch": [
        "**/*.test.ts",
        "**/*.spec.ts",
    ]
};
