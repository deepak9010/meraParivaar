class AppError extends Error {
  constructor(message, statusCode = 500, errors = [], type = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.type = type;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
