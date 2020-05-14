const { messages } = require('elasticio-node');
const PetstoreClient = require('../petstoreClient');

exports.init = function init(cfg) {
  console.log('Init: About to start');

  throw new Error("Ouch! Can't init the action");
};

/**
 * Executes the action's logic by sending a request to the Petstore API and emitting response to the platform.
 * The function emits the results of the request to the platform as a message
 *
 * @param msg incoming messages which is empty for triggers
 * @param cfg object to retrieve triggers configuration values, such as apiKey and pet status
 * Emits results as a message to the platform
 */
exports.process = async function process(msg, cfg) {
  // create a client object that has methods to make a request available to us
  const client = new PetstoreClient(this, cfg);

  /**
   * The format of a message coming into the function is
   * msg: {
   *  body: {
   *      name:
   *      status:
   *   }
   * }
   * So we deconstruct the object accordingly
   */
  const { name } = msg.body;

  const statuses = {
    Available: 'available',
    Pending: 'pending',
    Sold: 'sold',
  };

  // map the status value from the readable value to the internal camel case one
  const status = statuses[msg.body.status];

  if (!name) {
    throw new Error('Name is required');
  }

  if (!status) {
    throw new Error('Status is required');
  }

  // create pet object to post
  const pet = {
    name,
    status,
  };

  // make a request using the client and save the result to a parameter =>
  // makeRequest takes an object with the necessary fields to complete the request
  const result = await client.makeRequest({
    url: '/pet',
    method: 'POST',
    body: pet,
  });

  // this.emit is a function provided by sailor - we use it to emit messages to
  // our platform
  await this.emit('data', messages.newMessageWithBody(result));
};
