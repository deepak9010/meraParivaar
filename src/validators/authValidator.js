const Joi = require('joi');
const { emailSchema, passwordSchema, roleSchema } = require('./commonSchemas');

const signupSchema = Joi.object({
  name: Joi.string().trim().min(2).max(150).required(),
  email: emailSchema,
  password: passwordSchema,
  role: roleSchema.default('USER'),
});

const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

module.exports = {
  signupSchema,
  loginSchema,
};
