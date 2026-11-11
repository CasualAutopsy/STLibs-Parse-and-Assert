import { defineConfig } from 'eslint/config';
import globals from 'globals';

import js from '@eslint/js';
import ts from 'typescript-eslint';

import jsdoc from 'eslint-plugin-jsdoc';

import md from '@eslint/markdown';

export default defineConfig([
    { files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'] },
    { files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'], languageOptions: { globals: globals.browser } },
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        plugins: { js },
        extends: ['js/recommended'],
        rules: {
            'prefer-const': 'error',
            'no-unused-vars': [
                'error',
                {
                    'varsIgnorePattern': '^_+$',
                    'argsIgnorePattern': '^_+$',
                },
            ],
            'no-control-regex': 'off',
            'no-constant-condition': ['error', { checkLoops: false }],
            'require-yield': 'off',
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'indent': ['error', 4, { SwitchCase: 1, FunctionDeclaration: { parameters: 'first' } }],
            'comma-dangle': ['error', 'always-multiline'],
            'eol-last': ['error', 'always'],
            'no-trailing-spaces': 'error',
            'object-curly-spacing': ['error', 'always'],
            'space-infix-ops': 'error',
            'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
            'no-cond-assign': 'error',
            'no-unneeded-ternary': 'error',
            'no-irregular-whitespace': ['error', { skipStrings: true, skipTemplates: true }],
        },
    },
    {
        files: ['**/*.d.ts'],
        plugins: { ts },
        extends: ['ts/recommendedTypeChecked'],
        rules: {},
    },
    {
        files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
        plugins: { jsdoc },
        extends: ['jsdoc/flat/recommended-mixed'],
        rules: {
            'jsdoc/require-description': ['warn', { descriptionStyle: 'body' }],
        },
    },
    {
        files: ['**/*.md'],
        plugins: { md },
        extends: ['md/recommended'],
        language: 'md/gfm',
        rules: {},
    },
    {
        ignores: ['**/dist/**', '**/node_modules/**'],
    },
    {
        languageOptions: {
            globals: {
                SillyTavern: 'readonly',
                jQuery: 'readonly',
                $: 'readonly',
                toastr: 'readonly',
                STPALib: 'readonly',
            },
        },
    },
]);
