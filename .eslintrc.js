module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'node', 'import'],
  env: {
    node: true,
    es2021: true,
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': [
      'off', //no use variable warning
      { 
        'vars': 'all', 
        'varsIgnorePattern': '^_', 
        'args': 'after-used', 
        'argsIgnorePattern': '^_' 
      }
    ], 
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-missing-import': 'off',
    'node/no-extraneous-import': 'off',
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal']],
        'newlines-between': 'always',
      },
    ],
  },
};
