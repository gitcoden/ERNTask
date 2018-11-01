import { config as dev } from './webpack.config.dev';
import { config as prod } from './webpack.config.prod';

export default env => {
  if (env.production) {
    return prod;
  } else if (env.development) {
    return dev;
  }
};
