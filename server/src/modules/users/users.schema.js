const Joi = require('joi');

const updateUserSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(100),
    avatar_url: Joi.string().uri().allow('', null),
  }).min(1),
};

module.exports = { updateUserSchema };
