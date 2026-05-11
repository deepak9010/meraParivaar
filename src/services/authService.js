const AppError = require('../utils/AppError');
const statusCodes = require('../constants/statusCodes');
const errorTypes = require('../constants/errorTypes');
const messages = require('../constants/messages');
const ROLES = require('../constants/roles');
const userRepository = require('../repositories/userRepository');
const { hashPassword, comparePassword } = require('../helpers/passwordHelper');
const { signAccessToken } = require('../helpers/jwtHelper');
const auditService = require('./auditService');
const logger = require('../utils/logger');

const toPublicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  created_at: user.created_at,
  updated_at: user.updated_at,
});

const signup = async ({ name, email, password, role = ROLES.USER }, context = {}) => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new AppError(
      messages.AUTH.EMAIL_EXISTS,
      statusCodes.CONFLICT,
      [],
      errorTypes.CONFLICT
    );
  }

  const hashedPassword = await hashPassword(password);
  const user = await userRepository.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = signAccessToken({
    sub: user.id,
    role: user.role,
    email: user.email,
  });

  logger.info('User signed up', { userId: user.id, email: user.email, role: user.role });

  await auditService.logAction({
    userId: user.id,
    action: 'AUTH_SIGNUP',
    entityType: 'user',
    entityId: user.id,
    ipAddress: context.ipAddress,
  });

  return {
    user: toPublicUser(user),
    token,
  };
};

const login = async ({ email, password }, context = {}) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new AppError(
      messages.AUTH.INVALID_CREDENTIALS,
      statusCodes.UNAUTHORIZED,
      [],
      errorTypes.AUTHENTICATION
    );
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new AppError(
      messages.AUTH.INVALID_CREDENTIALS,
      statusCodes.UNAUTHORIZED,
      [],
      errorTypes.AUTHENTICATION
    );
  }

  const token = signAccessToken({
    sub: user.id,
    role: user.role,
    email: user.email,
  });

  logger.info('User logged in', { userId: user.id, email: user.email });

  await auditService.logAction({
    userId: user.id,
    action: 'AUTH_LOGIN',
    entityType: 'user',
    entityId: user.id,
    ipAddress: context.ipAddress,
  });

  return {
    user: toPublicUser(user),
    token,
  };
};

const getProfile = async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new AppError(
      messages.AUTH.TOKEN_INVALID,
      statusCodes.UNAUTHORIZED,
      [],
      errorTypes.AUTHENTICATION
    );
  }

  return toPublicUser(user);
};

module.exports = {
  signup,
  login,
  getProfile,
};
