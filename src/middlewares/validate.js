const AppError = require('../utils/AppError');
const statusCodes = require('../constants/statusCodes');
const errorTypes = require('../constants/errorTypes');
const messages = require('../constants/messages');

const validate = (schema, property = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));

    return next(new AppError(
      messages.VALIDATION.FAILED,
      statusCodes.BAD_REQUEST,
      errors,
      errorTypes.VALIDATION
    ));
  }

  req[property] = value;
  return next();
};

module.exports = validate;
