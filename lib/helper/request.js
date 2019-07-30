'use strict';
const request = require('request');
const qs = require('querystring');
const messages = require('elasticio-node').messages;
const debug = require('debug')('webhook:request');

exports.putOrPost = function putOrPost(method, msg, conf) {
    'use strict';
    const uri = conf.uri;
    const body = msg.body;

    debug('Request body: %j', body);

    // eslint-disable-next-line no-use-before-define
    let requestSettings = buildRequestSettings(method, uri, conf.secret);
    requestSettings.body = JSON.stringify(body);
    requestSettings.headers['Content-Type'] = 'application/json;charset=UTF-8';

    // eslint-disable-next-line no-use-before-define
    request(requestSettings, callback.bind(this));
};

exports.get = function get(msg, conf,) {
    'use strict';
    let uri = conf.uri;

    // Check if URI ends in ?  If it doesn't add one.
    if (uri.charAt(uri.length - 1) !== '?') {
        uri += '?';
    }

    uri += qs.stringify(msg.body);

    // eslint-disable-next-line no-use-before-define
    const requestSettings = buildRequestSettings('GET', uri, conf.secret);
    // eslint-disable-next-line no-use-before-define
    request(requestSettings, callback.bind(this));
};

function buildRequestSettings(method, uri, secret) {
    'use strict';
    let requestSettings = {
        uri: uri,
        method: method,
        headers: {}
    };

    if (secret) {
        requestSettings.headers['X-Api-Secret'] = secret;
    }

    return requestSettings;
}

function getJSONBody(contentType, body) {

    if (contentType && contentType.indexOf('application/json') === 0) {
        return JSON.parse(body);
    }

    return {
        responseBody: body
    };
}

function newMessage(response, body) {
    const headers = response.headers;

    const contentType = headers['content-type'];

    const msgBody = getJSONBody(contentType, body);

    const msg = messages.newMessageWithBody(msgBody);
    msg.headers = headers;

    return msg;
}

function callback(err, response, body) {
    'use strict';
    if (err) {
        // eslint-disable-next-line no-invalid-this
        this.emit('error', err);
        // eslint-disable-next-line no-invalid-this
        this.emit('end');
        return;
    }

    const sc = response.statusCode;

    if (sc >= 200 && sc <= 206) {
        // eslint-disable-next-line no-invalid-this
        this.emit('data', newMessage(response, body));
    } else {
        // eslint-disable-next-line no-invalid-this
        this.emit('error', new Error('Endpoint responds with ' + sc));
    }
    // eslint-disable-next-line no-invalid-this
    this.emit('end');
}
