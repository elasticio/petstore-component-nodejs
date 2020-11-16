const { messages } = require('elasticio-node');

const eventTypesMap = {
  user: {
    'carts/create': 'Create',
    'carts/update': 'Update',
  },
  product: {
    'products/create': 'Create',
    'products/update': 'Update',
    'products/delete': 'Delete',
  },
};

exports.process = async function process(msg, cfg) {
  const { objectType, eventTypes } = cfg;
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
    objectType,
    eventTypes,
  };
  await this.emit('data', messages.newMessageWithBody(pet));
};

exports.getEventTypes = async function getEventTypes(cfg) {
  return eventTypesMap[cfg.objectType];
};
