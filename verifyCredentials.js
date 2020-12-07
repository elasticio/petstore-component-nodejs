module.exports = async function verify(credentials) {
  const { apiKey } = credentials;
  if (!apiKey) throw new Error('Error from exception: API key is missing');
  return true;
};
