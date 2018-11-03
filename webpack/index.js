const backConfig = require('./back');
const frontConfig = require('./front');

module.exports = env => {
  if (env.back) {
    return backConfig(env);
  }

  if (env.front) {
    return frontConfig(env);
  }

  return {};
};
