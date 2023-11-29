module.exports = {
  'env': {
    'node': true,
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'import'
  ],
  // 'rules': {
  //   'indent': [
  //     'error',
  //     2
  //   ],
  //   'linebreak-style': [
  //     'error',
  //     'unix'
  //   ],
  //   'semi': [
  //     'error',
  //     'always'
  //   ],
  //   'no-unused-vars': 'error',
  //   'space-infix-ops': ['error', {'int32Hint': false}],
  //   'keyword-spacing': ['error', {'before': true, 'after': true}],
  //   'import/order': [
  //     'error',
  //     {
  //       'groups': [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'index'],
  //       'newlines-between': 'always'
  //     }
  //   ],
  //   'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],

  //   'class-methods-use-this': 'error',
  //   'func-style': ['error', 'declaration', { 'allowArrowFunctions': true }],

  //   'camelcase': 'error',
  //   'padding-line-between-statements': [
  //     'error',
  //     { 'blankLine': 'always', 'prev': '*', 'next': 'return' }
  //   ],
  //   'prefer-const': 'error',
  //   'comma-dangle': [
  //     'error',
  //     'never'
  //   ],
  //   'quotes': ['error', 'single'],
  //   'import/no-named-as-default': 0,
  //   'import/no-named-as-default-member': 0,
  //   'import/extensions': 0,
  //   'no-await-in-loop': 0,
  //   'no-useless-escape': 0,
  //   'no-console': 0,
  //   'no-plusplus': 0,
  //   'no-underscore-dangle': 0,
  //   'no-restricted-syntax': 0,
  //   'no-loop-func': 0,
  //   'import/prefer-default-export': 0,
  //   'react/jsx-uses-react': 'error',
  //   'react/jsx-uses-vars': 'error',
  //   'react/prop-types': 'off',
  //   'react/jsx-fragments': 'error',
  //   'react/jsx-no-undef': 'error',
  //   'react/self-closing-comp': 'error',
  //   'react/no-unescaped-entities': 'error'
  // }
  'rules': {
    'semi': 'error',
    'prefer-const': 'error',
    'comma-dangle': [
      'error',
      'never'
    ],
    'quotes': ['error', 'single'],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/extensions': 0,
    'no-await-in-loop': 0,
    'no-useless-escape': 0,
    'no-console': 0,
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
    'no-restricted-syntax': 0,
    'no-loop-func': 0,
    'import/prefer-default-export': 0,
    'indent': ['error', 2],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 'off',
    'react/jsx-fragments': 'error',
    'react/jsx-no-undef': 'error',
    'react/self-closing-comp': 'error',
    'react/no-unescaped-entities': 'error',
    'jsx-quotes': ['error', 'prefer-single']
  }
};