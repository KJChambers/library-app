import nextJest from "next/jest.js";

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./"
});

// Add any custom config to be passed to Jest
const config = {
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	resetMocks: true
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default async () => ({
	...(await createJestConfig(config)()),
	transformIgnorePatterns: ["/node_modules/(?!(next-auth)/)"],
});