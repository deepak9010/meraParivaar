const authService = require('../services/authService');
const { sendSuccess } = require('../utils/apiResponse');
const statusCodes = require('../constants/statusCodes');
const messages = require('../constants/messages');

const signup = async (req, res) => {
  const result = await authService.signup(req.body, { ipAddress: req.ip });

  return sendSuccess(res, {
    message: messages.AUTH.SIGNUP_SUCCESS,
    data: result,
    statusCode: statusCodes.CREATED,
  });
};

const login = async (req, res) => {
  const result = await authService.login(req.body, { ipAddress: req.ip });

  return sendSuccess(res, {
    message: messages.AUTH.LOGIN_SUCCESS,
    data: result,
    statusCode: statusCodes.OK,
  });
};

const getProfile = async (req, res) => {
  const user = await authService.getProfile(req.user.id);

  return sendSuccess(res, {
    message: messages.AUTH.PROFILE_FETCHED,
    data: user,
    statusCode: statusCodes.OK,
  });
};

module.exports = {
  signup,
  login,
  getProfile,
};
