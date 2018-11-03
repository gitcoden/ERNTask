const dev = require('./webpack.config.prod');
const prod = require('./webpack.config.dev');

module.exports = env => {
  if (env.production) {
    return dev;
  }

  if (env.development) {
    return prod;
  }

  return {};
};
