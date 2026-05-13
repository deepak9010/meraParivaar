const AppError = require('../utils/AppError');
const statusCodes = require('../constants/statusCodes');
const errorTypes = require('../constants/errorTypes');
const messages = require('../constants/messages');
const { verifyAccessToken } = require('../helpers/jwtHelper');
const userRepository = require('../repositories/userRepository');
const logger = require('../utils/logger');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(
        messages.AUTH.UNAUTHORIZED,
        statusCodes.UNAUTHORIZED,
        [],
        errorTypes.AUTHENTICATION
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);
    const user = await userRepository.findById(decoded.sub);

    if (!user) {
      throw new AppError(
        messages.AUTH.TOKEN_INVALID,
        statusCodes.UNAUTHORIZED,
        [],
        errorTypes.AUTHENTICATION
      );
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      mobile_number: user.mobile_number,
      role: user.role,
    };

    return next();
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    logger.warn('Authentication failed', { error: error.message });
    return next(new AppError(
      messages.AUTH.TOKEN_INVALID,
      statusCodes.UNAUTHORIZED,
      [],
      errorTypes.JWT
    ));
  }
};

module.exports = authenticate;
