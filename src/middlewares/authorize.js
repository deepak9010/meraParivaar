const AppError = require('../utils/AppError');
const statusCodes = require('../constants/statusCodes');
const errorTypes = require('../constants/errorTypes');
const messages = require('../constants/messages');

const authorize = (allowedRoles = []) => (req, res, next) => {
  if (!req.user) {
    return next(new AppError(
      messages.AUTH.UNAUTHORIZED,
      statusCodes.UNAUTHORIZED,
      [],
      errorTypes.AUTHENTICATION
    ));
  }

  if (!allowedRoles.includes(req.user.role)) {
    return next(new AppError(
      messages.AUTH.FORBIDDEN,
      statusCodes.FORBIDDEN,
      [],
      errorTypes.AUTHORIZATION
    ));
  }

  return next();
};

module.exports = authorize;
