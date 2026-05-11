const AppError = require('../utils/AppError');
const statusCodes = require('../constants/statusCodes');
const errorTypes = require('../constants/errorTypes');
const messages = require('../constants/messages');
const SOURCES = require('../constants/sources');
const recordRepository = require('../repositories/recordRepository');
const { buildSearchableFields, normalizeSearchQuery } = require('../helpers/searchNormalizer');
const { getPagination, buildPaginationMeta } = require('../helpers/paginationHelper');
const { toPublicRecord, toPublicRecords } = require('../helpers/recordPresenter');
const auditService = require('./auditService');

const buildRecordPayload = (input, { source, createdBy }) => ({
  ...input,
  ...buildSearchableFields(input),
  source,
  created_by: createdBy || null,
});

const ensureUniqueMobileNumber = async (mobileNumber, excludeId = null) => {
  const existingRecord = await recordRepository.findByMobileNumber(mobileNumber);

  if (existingRecord && existingRecord.id !== excludeId) {
    throw new AppError(
      messages.RECORD.MOBILE_EXISTS,
      statusCodes.CONFLICT,
      [],
      errorTypes.CONFLICT
    );
  }
};

const createRecord = async (payload, context = {}) => {
  await ensureUniqueMobileNumber(payload.mobile_number);

  const record = await recordRepository.create(buildRecordPayload(payload, {
    source: payload.source || SOURCES.ADMIN_PANEL,
    createdBy: context.userId,
  }));

  await auditService.logAction({
    userId: context.userId,
    action: 'RECORD_CREATE',
    entityType: 'record',
    entityId: record.id,
    metadata: {
      source: record.source,
      language: record.language,
    },
    ipAddress: context.ipAddress,
  });

  return toPublicRecord(record);
};

const getRecords = async (query = {}) => {
  const pagination = getPagination(query);
  const where = {};

  if (query.language) {
    where.language = query.language;
  }

  if (query.source) {
    where.source = query.source;
  }

  const result = await recordRepository.findAll({
    ...pagination,
    where,
  });

  return {
    items: toPublicRecords(result.rows),
    meta: buildPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total: result.count,
    }),
  };
};

const getRecordById = async (id) => {
  const record = await recordRepository.findById(id);

  if (!record) {
    throw new AppError(
      messages.RECORD.NOT_FOUND,
      statusCodes.NOT_FOUND,
      [],
      errorTypes.NOT_FOUND
    );
  }

  return toPublicRecord(record);
};

const updateRecord = async (id, payload, context = {}) => {
  const record = await recordRepository.findById(id);

  if (!record) {
    throw new AppError(
      messages.RECORD.NOT_FOUND,
      statusCodes.NOT_FOUND,
      [],
      errorTypes.NOT_FOUND
    );
  }

  if (payload.mobile_number) {
    await ensureUniqueMobileNumber(payload.mobile_number, id);
  }

  const mergedInput = {
    name: payload.name ?? record.name,
    block: payload.block ?? record.block,
    village: payload.village ?? record.village,
    constituency: payload.constituency ?? record.constituency,
    district: payload.district ?? record.district,
    state: payload.state ?? record.state,
    mobile_number: payload.mobile_number ?? record.mobile_number,
    language: payload.language ?? record.language,
  };

  const updatePayload = {
    ...payload,
    ...buildSearchableFields(mergedInput),
  };

  await recordRepository.updateById(id, updatePayload);
  const updatedRecord = await recordRepository.findById(id);

  await auditService.logAction({
    userId: context.userId,
    action: 'RECORD_UPDATE',
    entityType: 'record',
    entityId: id,
    ipAddress: context.ipAddress,
  });

  return toPublicRecord(updatedRecord);
};

const deleteRecord = async (id, context = {}) => {
  const record = await recordRepository.findById(id);

  if (!record) {
    throw new AppError(
      messages.RECORD.NOT_FOUND,
      statusCodes.NOT_FOUND,
      [],
      errorTypes.NOT_FOUND
    );
  }

  await recordRepository.deleteById(id);

  await auditService.logAction({
    userId: context.userId,
    action: 'RECORD_DELETE',
    entityType: 'record',
    entityId: id,
    ipAddress: context.ipAddress,
  });
};

const searchRecords = async (query = {}) => {
  const pagination = getPagination(query);
  const normalizedQuery = normalizeSearchQuery(query.q);

  if (!normalizedQuery) {
    throw new AppError(
      messages.VALIDATION.FAILED,
      statusCodes.BAD_REQUEST,
      [{ field: 'q', message: 'Search query is required' }],
      errorTypes.VALIDATION
    );
  }

  const result = await recordRepository.search({
    query: normalizedQuery,
    ...pagination,
  });

  return {
    items: toPublicRecords(result.rows),
    meta: buildPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total: result.count,
    }),
    query: query.q,
    normalizedQuery,
  };
};

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
  searchRecords,
};
