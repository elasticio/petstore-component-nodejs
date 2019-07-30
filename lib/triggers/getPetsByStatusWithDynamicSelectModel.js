"use strict";
const request = require('request-promise');
const messages = require('elasticio-node').messages;

const API_BASE_URI = 'https://petstore.elastic.io/v2';

exports.process = processTrigger;
exports.getStatusModel = getStatusModel;

/**
 * Executes the trigger's logic by sending a request to the Petstore API and emitting response to the platform.
 * The function returns a Promise sending a request and resolving the response as platform message.
 *
 * @param msg incoming messages which is empty for triggers
 * @param cfg object to retrieve triggers configuration values, such as apiKey and pet status
 * @returns promise resolving a message to be emitted to the platform
 */
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

    // return the promise that sends a request to the Petstore API
    return request.get(requestOptions)
        .then((response) => {

            console.log('Got %s pets', response.length);

            if (response.length) {

                // this message will be emitted to the platform
                // please note that we wrap the request payload into a message object
                return messages.newMessageWithBody({
                    pets: response
                });
            }
        });
}

/**
 * This function calls the Petstore API to retrieve the available pet statuses.
 * The response is transformed into an object, shown below:
 *
 * <pre>
 *     {
 *      "available": "Available",
 *      "pending": "Pending",
 *      "sold": "Sold"
 *     }
 * </pre>
 *
 * The returned object represents a model for a select box in which the keys represent the options
 * and the values their human representable names.
 *
 * @param cfg object to retrieve apiKey from
 * @returns promise resolving the select model
 */
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

            // transforming a simple array of statuses into a select model
            response.forEach((next) => {
                model[next] = next.charAt(0).toUpperCase() + next.substring(1);
            });

            return model;
        });
}