const { expect } = require('chai');
const sinon = require('sinon');
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

const self = {
  emit: sinon.spy(),
};

describe('Get Pets By Status', () => {
  it('Creates a pet', async () => {
    await action.process.call(self, msg, cfg);
    expect(self.emit.calledOnce).to.be.true;
  });
});
