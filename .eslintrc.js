// Todo: Minimized Eslint configuration

const importRules = {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    rules: {
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    ['^react', '^@?\\w'], // Packages `react` related packages come first.
                    ['^(@|components)(/.*|$)'], // Internal packages.
                    ['^\\u0000'], // Side effect imports.
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Parent imports. Put `..` last.
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Other relative imports. Put same-folder imports and `.` last.
                    ['^.+\\.?(css)$'], // Style imports.
                ],
            },
        ],
    },
};

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    settings: {
        react: {
            version: 'detect',
        },
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier', 'simple-import-sort'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                varsIgnorePattern: '^_+$',
                argsIgnorePattern: '^_+$',
            },
        ],
        '@typescript-eslint/no-var-requires': 'off',
        'react/jsx-uses-react': 'off',
        'no-useless-escape': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        indent: ['error', 4, { ignoredNodes: ['TemplateLiteral *'] }],
    },
    overrides: [importRules],
};
