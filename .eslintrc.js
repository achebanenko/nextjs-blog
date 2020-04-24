module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  ignorePatterns: [".next/"],
  rules: {
    "no-console": "warn",
    "comma-dangle": ["error", "always-multiline"],
    indent: ["error", 2],
    semi: ["error", "never"],
    quotes: ["error", "single"],
    "react/react-in-jsx-scope": "off",
  },
};
