const Joi = require('joi');
const { emailSchema, passwordSchema, roleSchema, mobileNumberSchema } = require('./commonSchemas');

const signupSchema = Joi.object({
  name: Joi.string().trim().min(2).max(150).required(),
  email: emailSchema,
  mobile_number: mobileNumberSchema,
  password: passwordSchema,
  role: roleSchema.default('USER'),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().empty('').optional(),
  mobile_number: Joi.string().trim().pattern(/^[0-9]{10,15}$/).empty('').optional(),
  password: passwordSchema,
}).xor('email', 'mobile_number');

module.exports = {
  signupSchema,
  loginSchema,
};
