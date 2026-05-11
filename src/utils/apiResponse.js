const sendSuccess = (res, {
  message,
  data = null,
  statusCode = 200,
}) => res.status(statusCode).json({
  success: true,
  message,
  data,
  statusCode,
});

const sendError = (res, {
  message,
  errors = [],
  statusCode = 500,
}) => res.status(statusCode).json({
  success: false,
  message,
  errors,
  statusCode,
});

module.exports = {
  sendSuccess,
  sendError,
};
