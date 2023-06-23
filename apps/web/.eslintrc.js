module.exports = {
  extends: ['eslint-config-custom/eslint-next'],
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
