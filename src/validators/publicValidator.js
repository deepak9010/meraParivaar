const Joi = require('joi');
const { recordFieldsSchema } = require('./commonSchemas');

const publicSubmitSchema = recordFieldsSchema.keys({
  token: Joi.string().trim().min(16).max(128).required(),
  source: Joi.forbidden(),
});

const createPublicLinkSchema = Joi.object({
  expires_at: Joi.date().iso().greater('now').optional(),
});

const publicFormTokenParamsSchema = Joi.object({
  token: Joi.string().trim().min(16).max(128).required(),
});

const publicLinkIdParamsSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

module.exports = {
  publicSubmitSchema,
  createPublicLinkSchema,
  publicFormTokenParamsSchema,
  publicLinkIdParamsSchema,
};
