import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import eslintPluginNext from '@next/eslint-plugin-next';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReact from 'eslint-plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const globalIgnores = {
  ignores: [
    '**/node_modules/',
    '.next/',
    'src/app/(payload)/',
    'coverage/',
    //TODO: Add supporting for parsing this mjs file
    'eslint.config.mjs',
  ],
};

// See: https://typescript-eslint.io/getting-started/typed-linting/
const typedLinting = {
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
};

// TODO: The Next.js plugin was not detected in your ESLint configuration. See https://nextjs.org/docs/app/api-reference/config/eslint#migrating-existing-config
const nextConfig = [
  {
    plugins: {
      '@next/next': eslintPluginNext,
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs['core-web-vitals'].rules,
    },
  },
];

const typescriptConfig = [
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
];

const miscConfig = [
  {
    plugins: {
      'jsx-a11y': eslintPluginJsxA11y,
      'react-hooks': eslintPluginReactHooks,
      react: eslintPluginReact,
    },
    rules: {
      ...eslintPluginJsxA11y.flatConfigs.recommended.rules,
      ...eslintPluginReactHooks.configs['recommended-latest'].rules,
      ...eslintPluginReact.configs.flat.rules,
    },
  },
];

const prettierConfig = [
  ...compat.extends('plugin:prettier/recommended'),
  {
    rules: {
      'prettier/prettier': 'error',
    },
  },
];

// Use tseslint helper to integrate everything
export default tseslint.config(
  globalIgnores,
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  typedLinting,
  ...nextConfig,
  ...typescriptConfig,
  ...miscConfig,
  ...prettierConfig,
);
