class ValidationError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 422;
  }
}

class NotFoundError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 404;
  }
}

module.exports = { ValidationError, NotFoundError };
