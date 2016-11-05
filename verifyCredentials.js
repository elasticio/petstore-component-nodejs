"use strict";
const request = require('request-promise');

module.exports = verify;

function verify(credentials) {

    // access the value of the apiKey field defined in credentials section of component.json
    const apiKey = credentials.apiKey;

    if (!apiKey) {
        throw new Error('API key is missing');
    }

    // sending a request to the most simple endpoint of the target API
    const requestOptions = {
        uri: 'https://petstore-popeye.elastic.io/v2/user/me',
        headers: {
            'api_key': apiKey
        },
        json: true
    };

    // if the request succeeds, we can assume the api key is valid
    return request.get(requestOptions);
}