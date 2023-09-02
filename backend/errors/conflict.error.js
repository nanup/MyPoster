class ConflictError extends Error {
  constructor(conflictMessage) {
    super(conflictMessage);
    this.name = 'ConflictError';
    this.status = 409;
  }
}

module.exports = ConflictError;
