module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-useless-catch': 'off',
    'no-shadow': 'off',
    'no-empty': 'off',
    indent: 'off',
    'no-underscore-dangle': 'off',
    'no-useless-escape': 'off', // regexp escapes
    // 'import/no-cycle': 'off',
    'linebreak-style': 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
