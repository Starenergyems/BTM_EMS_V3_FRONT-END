import js from '@eslint/js';
import eslintImport from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  { ignores: ['dist'] },
  perfectionist.configs['recommended-natural'],

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      import: eslintImport, //讓import引入路徑錯誤時跳出警告(需安裝eslint-plugin-import)
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      //讓使用import時，如果路徑不正確跳錯誤警告(需安裝eslint-plugin-import)
      'import/no-unresolved': ['error', { amd: true, commonjs: true }],
      //針對程式碼import的排序作客製化排序處理
      'perfectionist/sort-imports': [
        'warn',
        {
          customGroups: [
            {
              elementNamePattern: [
                '^react',
                '^react-dom$',
                '^react-router',
                '^react-hook-form',
              ],
              groupName: 'react',
            },
            {
              elementNamePattern: ['^antd($|/)', '^@ant-design($|/)'],
              groupName: 'antd',
            },
            {
              elementNamePattern: [
                '^@/styles($|/)',
                '.*[/\\\\][^/\\\\]*[sS]tyle[^/\\\\]*$',
              ],
              groupName: 'style',
            },
          ],
          groups: [
            'react',
            'builtin',
            'external',
            'internal',
            'antd',
            ['parent', 'sibling', 'index'],
            'type',
            'unknown',
            'side-effect',
            'side-effect-style',
            'style',
          ],
          internalPattern: ['^@/.*', '^~/.*'],
          newlinesBetween: 'ignore',
          order: 'asc',
          type: 'natural',
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      //關閉reac display-name 的命名檢查
      'react/display-name': 'off',
      'react/jsx-no-target-blank': 'off',
      //關閉reac prop-types 的型別檢查
      'react/prop-types': 'off',
    },
    settings: {
      //讓import使用絕對路徑不報錯(但需安裝eslint-import-resolver-alias)
      'import/resolver': {
        alias: {
          extensions: ['.js', '.jsx'],
          map: [['@', './src']],
        },
      },
      react: { version: '18.3' },
    },
  },
];
