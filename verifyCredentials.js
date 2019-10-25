const MagentoClient = require('./lib/petstoreClient');

/**
 * Executes the verification logic by sending a simple to the Petstore API using the provided apiKey.
 * If the request succeeds, we can assume that the apiKey is valid. Otherwise it is not valid.
 *
 * @param credentials object to retrieve apiKey from
 *
 * @returns boolean of whether or not the request was successful
 */
module.exports = async function verify(credentials) {
  const { apiKey } = credentials;

  if (!apiKey) throw new Error('API key is missing');

  const client = new MagentoClient(this, credentials);

  try {
    // sending a request to the most simple endpoint of the target API
    await client.makeRequest({
      url: '/user/me',
      method: 'GET',
    });

    // if the request succeeds, we can assume the api key is valid
    return true;
  } catch (e) {
    return false;
  }
};
