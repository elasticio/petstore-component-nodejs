"use strict";
const co = require('co');
const request = require('request-promise');
const messages = require('elasticio-node').messages;

const API_BASE_URI = 'https://petstore.elastic.io/v2';

exports.process = processTrigger;

/**
 * Executes the trigger's logic by sending a request to the Petstore API and emitting response to the platform.
 * The function returns a Promise sending a request and resolving the response as platform message.
 * Please note that the function is using co, a generator based control library, that allows you to use functionality
 * from the async/await proposal.
 *
 * See https://github.com/tj/co
 * See https://github.com/tc39/ecmascript-asyncawait
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

    // Returns a generator based control flow using co. Please note that co returns a Promise.
    return co(function*() {

        console.log('About to find pets by status:', status);

        const requestOptions = {
            uri: `${API_BASE_URI}/pet/findByStatus?status=${status}`,
            headers: {
                'api-key': apiKey
            },
            json: true
        };

        // yielding the response
        let response = yield request.get(requestOptions);

        const petCount = response.length;

        console.log('Got %s pets', petCount);

        if (petCount) {
            console.log('Emitting data');

            // this message will be emitted to the platform
            // please note that we wrap the request payload into a message object
            return messages.newMessageWithBody({
                pets: response
            });
        }

    });
}