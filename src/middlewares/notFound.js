const AppError = require('../utils/AppError');
const statusCodes = require('../constants/statusCodes');
const errorTypes = require('../constants/errorTypes');

const notFound = (req, res, next) => {
  next(new AppError(
    `Route not found: ${req.method} ${req.originalUrl}`,
    statusCodes.NOT_FOUND,
    [],
    errorTypes.NOT_FOUND
  ));
};

module.exports = notFound;
