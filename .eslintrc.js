module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'eslint-config-phrase'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        project: './tsconfig.json'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'class-methods-use-this': 'off',
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                jest: true,
            },
        },
    ],
};
