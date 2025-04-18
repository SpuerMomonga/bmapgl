import js from '@eslint/js'
import tsEslint from 'typescript-eslint'
import configPrettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default tsEslint.config(
  { ignores: ['**/node_modules', '**/build', '**/dist', '**/pnpm-lock.yaml', '.vscode'] },
  {
    extends: [js.configs.recommended, ...tsEslint.configs.recommended, configPrettier,],
    files: ['**/*.d.ts'],
    languageOptions: {
      ecmaVersion: 2020,
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'semi': ['error', 'always'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/triple-slash-reference': 'off'
    },
  },
)
