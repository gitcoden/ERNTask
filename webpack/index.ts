import backConfig from './back';
import frontConfig from './front';

export default env => {
  if (env.back) {
    return backConfig(env);
  } else if (env.front) {
    return frontConfig(env);
  }
};
