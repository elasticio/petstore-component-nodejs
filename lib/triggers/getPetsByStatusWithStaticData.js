const { messages } = require('elasticio-node');
const PetstoreClient = require('../petstoreClient');

/**
 * Executes the trigger's logic by sending a request to the Petstore API and emitting response to the platform.
 * The function emits the results of the request to the platform as a message
 *
 * @param msg incoming messages which is empty for triggers
 * @param cfg object to retrieve triggers configuration values, such as apiKey and pet status
 * Emits results as a message to the platform
 */
exports.process = async function getPetsByStatus(msg, cfg) {
  const client = new PetstoreClient(this, cfg);

  // access the value of the status field defined in credentials section of component.json
  const { status } = cfg;

  if (!status) {
    throw new Error('Status field is required');
  }

  // make a request using the client and save the result to a parameter
  const result = await client.makeRequest({
    url: `/pet/findByStatus?status=${status}`,
    method: 'GET',
  });

  // emit result using supplied emit function
  await this.emit('data', messages.newMessageWithBody(result));
};
