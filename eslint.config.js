import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintImport from "eslint-plugin-import";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: { version: "18.3" },
      //讓import使用絕對路徑不報錯(但需安裝eslint-import-resolver-alias)
      "import/resolver": {
        alias: {
          map: [["@", "./src"]],
          extensions: [".js", ".jsx"],
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: eslintImport, //讓import引入路徑錯誤時跳出警告(需安裝eslint-plugin-import)
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      //讓使用import時，如果路徑不正確跳錯誤警告(需安裝eslint-plugin-import)
      "import/no-unresolved": ["error", { commonjs: true, amd: true }],
      //關閉reac prop-types 的型別檢查
      "react/prop-types": "off",
      //關閉reac display-name 的命名檢查
      "react/display-name": "off",
    },
  },
];
