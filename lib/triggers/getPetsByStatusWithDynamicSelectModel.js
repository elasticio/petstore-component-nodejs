"use strict";
const request = require('request-promise');
const messages = require('elasticio-node').messages;

const API_BASE_URI = 'http://petstore.swagger.io/v2';

exports.process = processTrigger;
exports.getStatusModel = getStatusModel;

function processTrigger(msg, cfg) {

    // access the value of the apiKey field defined in credentials section of component.json
    const apiKey = cfg.apiKey;
    // access the value of the status field defined in credentials section of component.json
    const status = cfg.status;

    if (!status) {
        throw new Error('Status field is required');
    }

    console.log('About to find pets by status:', status);

    const requestUri = `${API_BASE_URI}/pet/findByStatus?status=${status}`;

    const requestOptions = {
        uri: requestUri,
        headers: {
            'api-key': apiKey
        },
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

function getStatusModel(cfg) {
    // access the value of the apiKey field defined in credentials section of component.json
    const apiKey = cfg.apiKey;

    const requestOptions = {
        uri: `${API_BASE_URI}/pet/statuses`,
        headers: {
            'api-key': apiKey
        },
        json: true
    };

    return request.get(requestOptions)
        .then((response) => {

            const model = {};

            response.forEach((next) => {
                model[next] = next;
            });

            return model;
        });
}