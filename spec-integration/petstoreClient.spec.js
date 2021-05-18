/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const PetstoreClient = require('../lib/petstoreClient');

const cfg = {
  apiKey: 'hello',
};

describe('PetStore Client tests', () => {
  it('Should set all variables corectly', () => {
    const client = new PetstoreClient(this, cfg);
    expect(client.cfg).to.deep.equal({
      apiKey: 'hello',
      resourceServerUrl: 'https://petstore.elastic.io/v2',
    });
    expect(client.apiKeyHeaderName).to.equal('api-key');
    expect(client.apiKeyHeaderValue).to.equal('hello');
  });
});
