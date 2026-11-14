import { defineConfig } from 'jest';

export default defineConfig({
    testEnvironment: 'node',
    transform: {},
    setupFiles: [
        '<rootDir>/tests/setup/setup.js',
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/main/cmds/assert-handlers.js',
        'src/main/st-*.js',
        'src/main/utils.js',
    ],
    coverageProvider: 'babel',
    coverageReporters: ['text'],

});
