module.exports = async function verify(credentials) {
  const { apiKey, apiKeyOptional } = credentials;
  if (!apiKey) throw new Error('Error from exception: API key is missing');
  if (!apiKeyOptional) throw new Error('Error from exception: apiKeyOptional is missing');
  return true;
};
