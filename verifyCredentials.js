'use strict';

/**
 * Executes the verification logic by checking that fields are not empty using the provided apiKey.
 *
 * @param credentials object to retrieve apiKey from
 *
 * @returns Promise which resolves true
 */

const authTypes = {
    BASIC: 'BASIC'
};

module.exports = function verify(credentials) {
    // access the value of the auth field defined in credentials section of component.json
    const { type, basic = {} } = credentials.auth;

    if (type === authTypes.BASIC) {
        if (!basic.username) {
            this.logger.debug('Error: Username is required for basic auth');
            throw new Error('Username is required for basic auth');
        }

        if (!basic.password) {
            this.logger.debug('Error: Password is required for basic auth');
            throw new Error('Password is required for basic auth');
        }
    }

    return Promise.resolve(true);
};
