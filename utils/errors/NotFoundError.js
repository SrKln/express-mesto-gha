const { STATUS } = require('../constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.NOT_FOUND;
  }
}

module.exports = NotFoundError;
