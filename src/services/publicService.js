const crypto = require('crypto');
const AppError = require('../utils/AppError');
const statusCodes = require('../constants/statusCodes');
const errorTypes = require('../constants/errorTypes');
const messages = require('../constants/messages');
const config = require('../config');
const SOURCES = require('../constants/sources');
const publicLinkRepository = require('../repositories/publicLinkRepository');
const recordService = require('./recordService');
const { getPagination, buildPaginationMeta } = require('../helpers/paginationHelper');

const generateToken = () => crypto.randomBytes(32).toString('hex');

const isLinkActive = (link) => {
  if (!link || !link.is_active) {
    return false;
  }

  if (link.expires_at && new Date(link.expires_at) < new Date()) {
    return false;
  }

  return true;
};

const createPublicLink = async (payload, context = {}) => {
  const token = generateToken();
  const link = await publicLinkRepository.create({
    token,
    created_by: context.userId,
    is_active: true,
    expires_at: payload.expires_at || null,
  });

  return {
    id: link.id,
    token: link.token,
    is_active: link.is_active,
    expires_at: link.expires_at,
    created_at: link.created_at,
    url: `${config.publicForm.baseUrl}/${link.token}`,
  };
};

const getPublicLinks = async (query = {}) => {
  const pagination = getPagination(query);
  const result = await publicLinkRepository.findAll(pagination);

  return {
    items: result.rows.map((link) => ({
      id: link.id,
      token: link.token,
      is_active: link.is_active,
      expires_at: link.expires_at,
      created_at: link.created_at,
      url: `${config.publicForm.baseUrl}/${link.token}`,
    })),
    meta: buildPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total: result.count,
    }),
  };
};

const getPublicForm = async (token) => {
  const link = await publicLinkRepository.findByToken(token);

  if (!isLinkActive(link)) {
    throw new AppError(
      messages.PUBLIC.LINK_INVALID,
      statusCodes.NOT_FOUND,
      [],
      errorTypes.NOT_FOUND
    );
  }

  return {
    token: link.token,
    languages: ['HI', 'EN'],
    fields: {
      HI: ['नाम', 'खंड', 'गांव', 'विधानसभा', 'ज़िला', 'राज्य', 'देश', 'मोबाइल नंबर'],
      EN: ['name', 'block', 'village', 'constituency', 'district', 'state', 'country', 'mobile_number'],
    },
    expires_at: link.expires_at,
  };
};

const submitPublicForm = async (payload) => {
  const link = await publicLinkRepository.findByToken(payload.token);

  if (!isLinkActive(link)) {
    throw new AppError(
      messages.PUBLIC.LINK_INVALID,
      statusCodes.NOT_FOUND,
      [],
      errorTypes.NOT_FOUND
    );
  }

  const { token, ...recordPayload } = payload;

  const record = await recordService.createRecord({
    ...recordPayload,
    source: SOURCES.OPEN_LINK,
  }, {
    userId: link.created_by,
  });

  return record;
};

module.exports = {
  createPublicLink,
  getPublicLinks,
  getPublicForm,
  submitPublicForm,
};
