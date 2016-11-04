"use strict";
const request = require('request-promise');
const messages = require('elasticio-node').messages;

const API_BASE_URI = 'http://petstore.swagger.io/v2/pet/findByStatus';

exports.process = processTrigger;

function processTrigger(msg, cfg) {

    const status = cfg.status;

    if (!status) {
        throw new Error('Status field is required');
    }

    console.log('About to find pets by status:', status);

    const requestUri = `${API_BASE_URI}?status=${status}`;

    const requestOptions = {
        uri: requestUri,
        json: true
    };

    return request.get(requestOptions)
        .then((response) => {

            console.log('Got %s pets', response.length);

            if (response.length) {

                return messages.newMessageWithBody({
                    pets: response
                });
            }
        });
}