/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');
const logger = require('@elastic.io/component-logger')();
const action = require('../lib/actions/createPet');

const cfg = {
  apiKey: 'secret',
  status: 'sold',
};

const msg = {
  body: {
    name: 'Nemo',
    status: 'Pending',
  },
};

// we use sinon to mock functions such as `emit`,
// which come from sailor when the code is loaded onto the platform
const self = {
  emit: sinon.spy(),
  logger,
};

describe('Get Pets By Status', () => {
  it('Creates a pet', async () => {
    await action.process.call(self, msg, cfg);
    expect(self.emit.calledOnce).to.be.true;
  });
});
