const Joi = require('joi');

const searchSchema = {
  query: Joi.object({
    q:     Joi.string().allow(''),
    page:  Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
};

module.exports = { searchSchema };
