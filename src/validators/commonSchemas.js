const Joi = require('joi');
const ROLES = require('../constants/roles');
const LANGUAGES = require('../constants/languages');
const SOURCES = require('../constants/sources');

const emailSchema = Joi.string().trim().email().required();

const passwordSchema = Joi.string().min(8).max(128).required();

const mobileNumberSchema = Joi.string().trim().pattern(/^[0-9]{10,15}$/).required();

const roleSchema = Joi.string().valid(...ROLES.ALL);

const languageSchema = Joi.string().valid(...LANGUAGES.ALL);

const sourceSchema = Joi.string().valid(...SOURCES.ALL);

const recordFieldsSchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
  block: Joi.string().trim().min(1).max(255).required(),
  village: Joi.string().trim().min(1).max(255).required(),
  constituency: Joi.string().trim().min(1).max(255).required(),
  district: Joi.string().trim().min(1).max(255).required(),
  state: Joi.string().trim().min(1).max(255).required(),
  mobile_number: mobileNumberSchema,
  language: languageSchema.required(),
  source: sourceSchema.optional(),
});

module.exports = {
  emailSchema,
  passwordSchema,
  mobileNumberSchema,
  roleSchema,
  languageSchema,
  sourceSchema,
  recordFieldsSchema,
};
