const publicService = require('../services/publicService');
const { sendSuccess } = require('../utils/apiResponse');
const statusCodes = require('../constants/statusCodes');
const messages = require('../constants/messages');

const createPublicLink = async (req, res) => {
  const link = await publicService.createPublicLink(req.body, {
    userId: req.user.id,
  });

  return sendSuccess(res, {
    message: messages.PUBLIC.LINK_CREATED,
    data: link,
    statusCode: statusCodes.CREATED,
  });
};

const getPublicLinks = async (req, res) => {
  const result = await publicService.getPublicLinks(req.query);

  return sendSuccess(res, {
    message: messages.PUBLIC.LINK_FETCHED,
    data: result,
    statusCode: statusCodes.OK,
  });
};

const deletePublicLink = async (req, res) => {
  await publicService.deletePublicLink(req.params.id);

  return sendSuccess(res, {
    message: messages.PUBLIC.LINK_DELETED,
    data: null,
    statusCode: statusCodes.OK,
  });
};

const getPublicForm = async (req, res) => {
  const form = await publicService.getPublicForm(req.params.token);

  return sendSuccess(res, {
    message: messages.PUBLIC.LINK_FETCHED,
    data: form,
    statusCode: statusCodes.OK,
  });
};

const submitPublicForm = async (req, res) => {
  const record = await publicService.submitPublicForm(req.body);

  return sendSuccess(res, {
    message: messages.PUBLIC.SUBMIT_SUCCESS,
    data: record,
    statusCode: statusCodes.CREATED,
  });
};

module.exports = {
  createPublicLink,
  deletePublicLink,
  getPublicLinks,
  getPublicForm,
  submitPublicForm,
};
