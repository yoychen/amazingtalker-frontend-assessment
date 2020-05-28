module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/amazingtalker-frontend-assessment/'
    : '/',
  devServer: {
    proxy: 'https://api.amazingtalker.com/v1/guest/teachers/amy-estrada',
  },
};
