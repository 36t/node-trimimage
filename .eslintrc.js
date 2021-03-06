module.exports = {
    env: {
        node: true,
        es2021: true
    },
    extends: [
        "eslint:recommended",
        "standard",
        "prettier"
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: [],
    rules: {
        indent: ["warn", 4],
        quotes: ["warn", "double"],
        semi: ["warn", "always"],
        "comma-dangle": ["error", "never"]
    }
};
