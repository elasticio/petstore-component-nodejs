// eslint-disable-next-line no-unused-vars
exports.process = async function process(msg, cfg) {
  const error = new Error('Error Message From Code Component');
  this.logger.error('Error logging');
  throw error;
};
