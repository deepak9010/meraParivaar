const recordService = require('../services/recordService');
const { sendSuccess } = require('../utils/apiResponse');
const statusCodes = require('../constants/statusCodes');
const messages = require('../constants/messages');

const createRecord = async (req, res) => {
  const record = await recordService.createRecord(req.body, {
    userId: req.user.id,
    ipAddress: req.ip,
  });

  return sendSuccess(res, {
    message: messages.RECORD.CREATED,
    data: record,
    statusCode: statusCodes.CREATED,
  });
};

const getRecords = async (req, res) => {
  const result = await recordService.getRecords(req.query);

  return sendSuccess(res, {
    message: messages.RECORD.LIST_FETCHED,
    data: result,
    statusCode: statusCodes.OK,
  });
};

const getRecordById = async (req, res) => {
  const record = await recordService.getRecordById(req.params.id);

  return sendSuccess(res, {
    message: messages.RECORD.FETCHED,
    data: record,
    statusCode: statusCodes.OK,
  });
};

const updateRecord = async (req, res) => {
  const record = await recordService.updateRecord(req.params.id, req.body, {
    userId: req.user.id,
    ipAddress: req.ip,
  });

  return sendSuccess(res, {
    message: messages.RECORD.UPDATED,
    data: record,
    statusCode: statusCodes.OK,
  });
};

const deleteRecord = async (req, res) => {
  await recordService.deleteRecord(req.params.id, {
    userId: req.user.id,
    ipAddress: req.ip,
  });

  return sendSuccess(res, {
    message: messages.RECORD.DELETED,
    data: null,
    statusCode: statusCodes.OK,
  });
};

const searchRecords = async (req, res) => {
  const result = await recordService.searchRecords(req.query);

  return sendSuccess(res, {
    message: messages.RECORD.SEARCH_SUCCESS,
    data: result,
    statusCode: statusCodes.OK,
  });
};

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
  searchRecords,
};
