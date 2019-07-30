'use strict';

const ERROR = 'error';
const WARN = 'warn';
const ALWAYS = 'always';
const NEVER = 'never';
const OFF = 'off';

module.exports = {
    'env': {
        es6: true,
        node: true,
        mocha: true
    },
    'parserOptions': {
        ecmaVersion: 2017
    },
    'extends': 'eslint:recommended',
    'plugins': [
        'mocha'
    ],
    'rules': {
        'indent': [
            ERROR,
            4,
            {
                SwitchCase: 1
            }
        ],
        'linebreak-style': ERROR,
        'quotes': [
            WARN,
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        'semi': [
            ERROR,
            ALWAYS
        ],
        'func-names': WARN,
        'no-empty': ERROR,
        'no-empty-function': ERROR,
        'brace-style': [
            ERROR,
            '1tbs',
            { allowSingleLine: true }
        ],
        'no-multiple-empty-lines': ERROR,
        'no-multi-spaces': ERROR,
        'one-var': [
            ERROR,
            NEVER
        ],
        'quote-props': [
            WARN,
            'consistent-as-needed'
        ],
        'key-spacing': ERROR,
        'space-unary-ops': [
            ERROR,
            {
                words: true,
                nonwords: false
            }
        ],
        'no-spaced-func': ERROR,
        'space-before-function-paren': [
            ERROR,
            {
                anonymous: ALWAYS,
                named: NEVER
            }
        ],
        'arrow-body-style': [
            WARN,
            'as-needed'
        ],
        'array-bracket-spacing': ERROR,
        'space-in-parens': ERROR,
        'comma-dangle': WARN,
        'no-trailing-spaces': ERROR,
        'yoda': ERROR,
        'max-len': [
            ERROR,
            120
        ],
        'camelcase': [
            ERROR,
            {
                properties: 'never'
            }
        ],
        'new-cap': [
            WARN,
            {
                capIsNewExceptions: ['Q']
            }
        ],
        'comma-style': ERROR,
        'curly': ERROR,
        'object-curly-spacing': [
            WARN,
            ALWAYS
        ],
        'object-curly-newline': [
            OFF
        ],
        'object-property-newline': OFF,
        'template-curly-spacing': ERROR,
        'dot-notation': ERROR,
        'dot-location': [
            ERROR,
            'property'
        ],
        'func-style': [
            ERROR,
            'declaration',
            {
                allowArrowFunctions: true
            }
        ],
        'eol-last': ERROR,
        'space-infix-ops': ERROR,
        'keyword-spacing': ERROR,
        'space-before-blocks': ERROR,
        'no-invalid-this': ERROR,
        'consistent-this': ERROR,
        'no-this-before-super': ERROR,
        'no-unreachable': ERROR,
        'no-sparse-arrays': ERROR,
        'array-callback-return': ERROR,
        'strict': [
            OFF,
            'global'
        ],
        'eqeqeq': ERROR,
        'no-use-before-define': WARN,
        'no-undef': ERROR,
        'no-unused-vars': WARN,
        'no-mixed-spaces-and-tabs': ERROR,
        'operator-linebreak': [
            ERROR,
            'before'
        ],
        'no-console': [
            WARN,
            {
                'allow': [
                    'warn',
                    'error'
                ]
            }
        ],
        'mocha/no-exclusive-tests': ERROR,
        'mocha/no-skipped-tests': ERROR
    }
};