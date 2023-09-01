class FailedAuthenticationError extends Error {
  constructor(failedAuthenticationMessage) {
    super(failedAuthenticationMessage);
    this.name = 'FailedAuthenticationError';
    this.status = 403;
  }
}

module.exports = FailedAuthenticationError;
