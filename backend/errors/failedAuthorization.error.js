class FailedAuthorizationError extends Error {
  constructor(failedAuthorizationMessage) {
    super(failedAuthorizationMessage);
    this.name = 'FailedAuthorizationError';
    this.status = 401;
  }
}

module.exports = FailedAuthorizationError;
