module.exports = {
    testPathIgnorePatterns: ['/node_modules/', '/examples/'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    coveragePathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/.*\\.type\\.ts'
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
};
