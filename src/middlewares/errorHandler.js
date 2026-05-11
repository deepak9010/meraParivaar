const { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } = require('sequelize');
const AppError = require('../utils/AppError');
const { sendError } = require('../utils/apiResponse');
const statusCodes = require('../constants/statusCodes');
const errorTypes = require('../constants/errorTypes');
const messages = require('../constants/messages');
const logger = require('../utils/logger');

const mapSequelizeError = (error) => {
  if (error instanceof UniqueConstraintError) {
    return new AppError(
      'Duplicate value violates unique constraint',
      statusCodes.CONFLICT,
      error.errors.map((item) => ({
        field: item.path,
        message: item.message,
      })),
      errorTypes.CONFLICT
    );
  }

  if (error instanceof ValidationError) {
    return new AppError(
      messages.VALIDATION.FAILED,
      statusCodes.BAD_REQUEST,
      error.errors.map((item) => ({
        field: item.path,
        message: item.message,
      })),
      errorTypes.VALIDATION
    );
  }

  if (error instanceof ForeignKeyConstraintError) {
    return new AppError(
      'Referenced resource does not exist',
      statusCodes.BAD_REQUEST,
      [],
      errorTypes.SEQUELIZE
    );
  }

  return new AppError(
    messages.SERVER.INTERNAL_ERROR,
    statusCodes.INTERNAL_SERVER_ERROR,
    [],
    errorTypes.SEQUELIZE
  );
};

const errorHandler = (error, req, res, next) => {
  let appError = error;

  if (!(error instanceof AppError)) {
    if (error instanceof UniqueConstraintError
      || error instanceof ValidationError
      || error instanceof ForeignKeyConstraintError) {
      appError = mapSequelizeError(error);
    } else if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      appError = new AppError(
        messages.AUTH.TOKEN_INVALID,
        statusCodes.UNAUTHORIZED,
        [],
        errorTypes.JWT
      );
    } else {
      appError = new AppError(
        messages.SERVER.INTERNAL_ERROR,
        statusCodes.INTERNAL_SERVER_ERROR,
        [],
        errorTypes.INTERNAL
      );
    }
  }

  if (appError.statusCode >= 500) {
    logger.error('Unhandled application error', {
      message: error.message,
      stack: error.stack,
      path: req.originalUrl,
      method: req.method,
    });
  } else {
    logger.warn('Operational error', {
      message: appError.message,
      statusCode: appError.statusCode,
      path: req.originalUrl,
      method: req.method,
    });
  }

  return sendError(res, {
    message: appError.message,
    errors: appError.errors,
    statusCode: appError.statusCode,
  });
};

module.exports = errorHandler;
