module.exports = {
  extends: ['eslint-config-custom/eslint-server'],
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
