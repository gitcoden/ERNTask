"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import backConfig from './back';
const front_1 = require("./front");
exports.default = env => {
    if (env.back) {
        // return backConfig(env);
    }
    else if (env.front) {
        return front_1.default(env);
    }
};
