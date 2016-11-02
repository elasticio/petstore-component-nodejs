"use strict";
const request = require('request-promise');
const messages = require('elasticio-node').messages;

const API_BASE_URI = 'http://petstore.swagger.io/v2/pet/findByStatus';

exports.process = processTrigger;

function processTrigger(msg, cfg) {

    const self = this;

    Promise.resolve()
        .then(sendRequest)
        .then(emitDataIfRequired)
        .then(emitEnd)
        .catch(onError);

    function sendRequest() {
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

        return request.get(requestOptions);
    }

    function emitDataIfRequired(response) {

        const petCount = response.length;

        console.log('Got %s pets', petCount);

        if (petCount) {
            console.log('Emitting data');

            const data = messages.newMessageWithBody({
                pets: response
            });

            console.log('%j', data);

            self.emit('data', data);

            console.log('Finished execution');
        }
    }

    function emitEnd() {
        self.emit('end');
    }

    function onError(e) {
        console.error(e);

        self.emit('error', e);

        emitEnd();
    }
}