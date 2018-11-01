"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_config_dev_1 = require("./webpack.config.dev");
const webpack_config_prod_1 = require("./webpack.config.prod");
exports.default = env => {
    if (env.production) {
        return webpack_config_prod_1.config;
    }
    else if (env.development) {
        return webpack_config_dev_1.config;
    }
};
