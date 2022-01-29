module.exports = {
    esnv: {
        browser: true,
        es2021: false,
    },
    extends: ["eslint:recommended"],
    parserOptions: {
        ecmaVersion: 13,
    },
    rules: {
        semi: ["error", "always"],
        quotes: ["error", "double"],
    },
};