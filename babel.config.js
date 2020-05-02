const config = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [],
};

// https://element.eleme.io/#/en-US/component/quickstart#on-demand
const elementUILoadOnDemand = [
  'component',
  {
    libraryName: 'element-ui',
    styleLibraryName: 'theme-chalk',
  },
];

/**
 * Prevent babel-plugin-component importing css in Jest
 */
if (process.env.NODE_ENV !== 'test') {
  config.plugins.push(elementUILoadOnDemand);
}

module.exports = config;
