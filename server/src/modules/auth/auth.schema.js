const Joi = require('joi');

const registerSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(72).required(),
  }),
};

const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const refreshSchema = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

const googleAuthSchema = {
  body: Joi.object({
    idToken: Joi.string().required(),
  }),
};

module.exports = { registerSchema, loginSchema, refreshSchema, googleAuthSchema };
