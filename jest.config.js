module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: [
    './tests/setup.js',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}', '!src/{main,App}.{js,vue}'],
};
