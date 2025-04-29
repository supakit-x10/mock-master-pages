const nextJest = require("next/jest");

const createJestConfig = nextJest({
	dir: "./"
});

const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	moduleDirectories: ["node_modules", "<rootDir>/"],
	testEnvironment: "jest-environment-jsdom",
	modulePathIgnorePatterns: ["<rootDir>/src/__tests__/spy"],
	testResultsProcessor: "./node_modules/jest-html-reporter",
	collectCoverageFrom: ["**/*.usecase.ts", "**/*.repository.ts"],
	coverageReporters: ["lcov"],
	coverageDirectory: "<rootDir>/report/coverage"
};

module.exports = createJestConfig(customJestConfig);
