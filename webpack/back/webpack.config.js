const dev = require('./webpack.config.dev');
const prod = require('./webpack.config.prod');

module.exports = env => {
  if (env.production) {
    return prod;
  }

  if (env.development) {
    return dev;
  }

  return {};
};
