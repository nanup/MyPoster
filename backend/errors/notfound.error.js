class NotFoundError extends Error {
  constructor(notFoundMessage) {
    super(notFoundMessage);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

module.exports = NotFoundError;
