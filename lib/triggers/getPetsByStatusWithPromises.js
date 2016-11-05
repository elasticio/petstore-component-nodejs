"use strict";
const request = require('request-promise');
const messages = require('elasticio-node').messages;

const API_BASE_URI = 'https://petstore-popeye.elastic.io/v2';

exports.process = processTrigger;

function processTrigger(msg, cfg) {

    // access the value of the apiKey field defined in credentials section of component.json
    const apiKey = cfg.apiKey;
    // access the value of the status field defined in credentials section of component.json
    const status = cfg.status;

    if (!status) {
        throw new Error('Status field is required');
    }

    console.log('About to find pets by status:', status);

    const requestOptions = {
        uri: `${API_BASE_URI}/pet/findByStatus?status=${status}`,
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