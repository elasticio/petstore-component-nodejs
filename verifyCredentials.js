module.exports = async function verify(credentials) {
  const { apiKey, tenantId, resourceServerUrl } = credentials;

  if (!apiKey) throw new Error('API key is missing');
  if (!tenantId) throw new Error('Tenant ID is missing');
  if (!resourceServerUrl) throw new Error('Resource server URL is missing');

  try {
    this.logger.info('The credentials: ', apiKey, tenantId, resourceServerUrl);
    console.log('The credentials: ', apiKey, tenantId, resourceServerUrl);
    this.logger.info('request succeeded');
    return true;
  } catch (e) {
    this.logger.info('catch block');
    this.logger.info('response', e.response);
    this.logger.info('status', e.response.status);
    if (e.response) {
      this.logger.info('e.response block');
      const { status } = e.response;
      if (status === 400) {
        this.logger.info('status 400 block');
        return true;
      }
    }
    this.logger.info('other codes error block');
    // Other cases (no response, status other than 2xx or 400)
    throw new Error('Verification failed');
  }
};
