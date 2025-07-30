module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:playwright/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'playwright'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  env: {
    node: true,
    es2022: true
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'playwright/expect-expect': 'error',
    'playwright/missing-playwright-await': 'error',
    'playwright/no-page-pause': 'warn',
    'playwright/valid-expect': 'error'
  },
  overrides: [
    {
      files: ['tests/**/*.spec.ts', 'tests/**/*.test.ts'],
      rules: {
        'playwright/expect-expect': 'error'
      }
    }
  ]
};
