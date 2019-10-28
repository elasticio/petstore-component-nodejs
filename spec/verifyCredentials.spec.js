const { expect } = require('chai');
const verify = require('../verifyCredentials');

// typically, we cannot keep the API key stored in a test file like this and would instead be imported from a .env file
const cfg = {
  apiKey: 'secret',
};

describe('VerifyCredentials works as intended', () => {
  it('Works for success', async () => {
    const result = await verify.call(this, cfg);
    expect(result).to.be.true;
  });

  it('Works for failure', async () => {
    cfg.apiKey = 'not secret'
    const result = await verify.call(this, cfg);
    expect(result).to.be.false;
  });
});
