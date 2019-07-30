'use strict';
const request = require('./request.js');

// eslint-disable-next-line func-names
exports.process = function (msg, conf) {
    request.get.call(this, msg, conf);
};
