'use strict';
const request = require('../helper/request.js');
const DEFAULT_METHOD = 'POST';

// eslint-disable-next-line func-names
exports.process = function (msg, conf) {
    request.putOrPost.call(this, conf.method || DEFAULT_METHOD, msg, conf);
};
