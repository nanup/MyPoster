class BadRequestError extends Error {
  constructor(badRequestMessage) {
    super(badRequestMessage);
    this.name = 'BadRequestError';
    this.status = 400;
  }
}

module.exports = BadRequestError;
