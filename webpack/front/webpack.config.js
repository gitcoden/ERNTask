const webpackConfigDev = require('./webpack.config.dev');
const webpackConfigProd = require('./webpack.config.prod');

module.exports = env => {
  if (env.production) {
    return webpackConfigProd;
  }

  if (env.development) {
    return webpackConfigDev;
  }

  return {};
};
