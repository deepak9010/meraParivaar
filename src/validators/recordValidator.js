const Joi = require('joi');
const { recordFieldsSchema } = require('./commonSchemas');

const createRecordSchema = recordFieldsSchema.keys({
  source: Joi.forbidden(),
});

const updateRecordSchema = recordFieldsSchema.fork(
  ['name', 'block', 'village', 'constituency', 'district', 'state', 'mobile_number', 'language'],
  (schema) => schema.optional()
).min(1);

const searchRecordsSchema = Joi.object({
  q: Joi.string().trim().min(1).max(255).required(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
});

const listRecordsSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  language: Joi.string().valid('HI', 'EN').optional(),
  source: Joi.string().valid('OPEN_LINK', 'ADMIN_PANEL').optional(),
});

module.exports = {
  createRecordSchema,
  updateRecordSchema,
  searchRecordsSchema,
  listRecordsSchema,
};
