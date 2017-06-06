const http = require('http');

function HttpError (status, message) {
  this.name = 'HttpError';
  this.message = message || http.STATUS_CODES[status];
  this.status = status;
}
HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.constructor = HttpError;
module.exports = HttpError;
