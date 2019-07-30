/* eslint-env node, mocha */
'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const nock = require('nock');
const send = require('../lib/actions/send.js');
const getMethod = require('../lib/helper/get.js');
const receive = require('../lib/triggers/receive.js');

describe('Test Webhook', () => {
    afterEach(() => {
        sinon.reset();
    });
    const webhookReturnObj = { message: 'ok', other: 'returned' };
    let self;

    it('PUT No Auth', async () => {
        let nockObj = nock('http://www.example.com')
            .put('/test', {
                k1: 'v1',
                k2: 'v2'
            })
            .matchHeader('Content-Type', 'application/json;charset=UTF-8')
            .reply(200, webhookReturnObj, {
                'Content-type': 'application/json;charset=UTF-8'
            });

        await new Promise((resolve) => {
            const emitter = {
                emit: (name) => {
                    if (name === 'end') {
                        resolve();
                    }
                }
            };
            self = sinon.spy(emitter, 'emit');
            send.process.call(
                { emit: self }, {
                    body: {
                        k1: 'v1',
                        k2: 'v2'
                    }
                }, {
                    uri: 'http://www.example.com/test',
                    method: 'PUT'
                });
        }
        );
        expect(nockObj.isDone());
        expect(self.calledTwice).to.be.true;
        expect(self.args[0][1].body).to.eql(webhookReturnObj);
        expect(self.args[1][0]).to.eql('end');
    });

    it('PUT Auth', async () => {
        let nockObj = nock('http://www.example.com')
            .put('/test', {
                k1: 'v1',
                k2: 'v2'
            })
            .matchHeader('Content-Type', 'application/json;charset=UTF-8')
            .matchHeader('X-Api-Secret', 'theSecret')
            .reply(200, webhookReturnObj, {
                'Content-type': 'application/json;charset=UTF-8'
            });

        await new Promise((resolve) => {
            const emitter = {
                emit: (name) => {
                    if (name === 'end') {
                        resolve();
                    }
                }
            };
            self = sinon.spy(emitter, 'emit');
            send.process.call(
                { emit: self }, {
                    body: {
                        k1: 'v1',
                        k2: 'v2'
                    }
                }, {
                    uri: 'http://www.example.com/test',
                    secret: 'theSecret',
                    method: 'PUT'
                });
        }
        );
        expect(nockObj.isDone());
        expect(self.calledTwice).to.be.true;
        expect(self.args[0][1].body).to.eql(webhookReturnObj);
        expect(self.args[1][0]).to.eql('end');
    });

    it('POST and get text/html response', async () => {
        let nockObj = nock('http://www.example.com')
            .post('/test', {
                k1: 'v1',
                k2: 'v2'
            })
            .matchHeader('Content-Type', 'application/json;charset=UTF-8')
            .reply(200, webhookReturnObj, {
                'Content-type': 'text/html; charset=utf-8'
            });

        await new Promise((resolve) => {
            const emitter = {
                emit: (name) => {
                    if (name === 'end') {
                        resolve();
                    }
                }
            };
            self = sinon.spy(emitter, 'emit');
            send.process.call(
                { emit: self }, {
                    body: {
                        k1: 'v1',
                        k2: 'v2'
                    }
                }, {
                    uri: 'http://www.example.com/test'
                });
        }
        );
        expect(nockObj.isDone());
        expect(self.calledTwice).to.be.true;
        expect(self.args[0][1].body).to.eql({
            responseBody: '{"message":"ok","other":"returned"}'
        });
        expect(self.args[1][0]).to.eql('end');

    });

    it('GET No Auth No QMark', async () => {
        let nockObj = nock('http://www.example.com')
            .get('/test?k1=v1&k2=v2')
            .reply(200, webhookReturnObj);

        await new Promise((resolve) => {
            const emitter = {
                emit: (name) => {
                    if (name === 'end') {
                        resolve();
                    }
                }
            };
            self = sinon.spy(emitter, 'emit');
            getMethod.process.call(
                { emit: self }, {
                    body: {
                        k1: 'v1',
                        k2: 'v2'
                    },
                    headers: {
                        test: 'header'
                    }
                }, {
                    uri: 'http://www.example.com/test'
                });
        }
        );
        expect(nockObj.isDone());
        expect(self.calledTwice).to.be.true;
        expect(self.args[0][0]).to.eql('data');
        expect(self.args[0][1].body).to.eql(webhookReturnObj);
        expect(self.args[1][0]).to.eql('end');

    });

    it('GET Auth QMark', async () => {
        let nockObj = nock('http://www.example.com')
            .get('/test?k1=v1&k2=v2')
            .matchHeader('X-Api-Secret', 'theSecret')
            .reply(200, webhookReturnObj);

        await new Promise((resolve) => {
            const emitter = {
                emit: (name) => {
                    if (name === 'end') {
                        resolve();
                    }
                }
            };
            self = sinon.spy(emitter, 'emit');
            getMethod.process.call(
                { emit: self }, {
                    body: {
                        k1: 'v1',
                        k2: 'v2'
                    },
                    headers: {
                        test: 'header'
                    },
                    url: 'test'
                }, {
                    uri: 'http://www.example.com/test',
                    secret: 'theSecret'
                });
        }
        );
        expect(nockObj.isDone());
        expect(self.calledTwice).to.be.true;
        expect(self.args[0][0]).to.eql('data');
        expect(self.args[0][1].body).to.eql(webhookReturnObj);
        expect(self.args[1][0]).to.eql('end');
    });

    it('404', async () => {
        let nockObj = nock('http://www.example.com')
            .get('/test?k1=v1&k2=v2')
            .matchHeader('X-Api-Secret', 'theSecret')
            .reply(404);

        await new Promise((resolve) => {
            const emitter = {
                emit: (name) => {
                    if (name === 'end') {
                        resolve();
                    }
                }
            };
            self = sinon.spy(emitter, 'emit');
            getMethod.process.call(
                { emit: self }, {
                    body: {
                        k1: 'v1',
                        k2: 'v2'
                    },
                    headers: {
                        test: 'header'
                    }
                }, {
                    uri: 'http://www.example.com/test?',
                    secret: 'theSecret'
                });
        }
        );
        expect(nockObj.isDone());
        expect(self.calledTwice).to.be.true;
        expect(self.args[0][0]).to.eql('error');
        expect(self.args[0][1].message).to.eql('Endpoint responds with 404');
        expect(self.args[1][0]).to.eql('end');
    });

    it('Inbound', async () => {
        const msg = {
            id: '1',
            body: {
                k1: 'v1',
                k2: 'v2'
            },
            headers: {
                test: 'header'
            },
            url: 'test'
        };

        await new Promise((resolve) => {
            const emitter = {
                emit: (name) => {
                    if (name === 'end' || name === 'error') {
                        resolve();
                    }
                }
            };
            self = sinon.spy(emitter, 'emit');
            receive.process.call({ emit: self }, msg, {});
        }
        );
        expect(self.args[0][1]).to.be.not.udefined;
        expect(self.args[0][1].body).to.be.not.udefined;
        expect(self.args[0][1].body._query).to.be.not.udefined;
        expect(self.args[0][1].body._url).to.eql('test');
        expect(self.args[0]).to.eql(['data', msg]);
        expect(self.args[1][0]).to.eql('end');
    });

    it('Inbound with query', async () => {
        const msg = {
            id: '1',
            body: {
                k1: 'v1',
                k2: 'v2'
            },
            headers: {
                test: 'header'
            },
            url: 'test',
            query: {
                baz: 'boo'
            }
        };

        await new Promise((resolve) => {
            const emitter = {
                emit: (name) => {
                    if (name === 'end') {
                        resolve();
                    }
                }
            };
            self = sinon.spy(emitter, 'emit');
            receive.process.call({ emit: self }, msg, {});
        }
        );
        expect(self.args[0][1]).to.be.not.udefined;
        expect(self.args[0][1].body).to.be.not.udefined;
        expect(self.args[0][1].body._query).to.eql({ baz: 'boo' });
        expect(self.args[0][1].body._url).to.eql('test');
        expect(self.args[0]).to.eql(['data', msg]);
        expect(self.args[1][0]).to.eql('end');
    });
});

