const Joi = require('joi');

const createTripSchema = {
  body: Joi.object({
    title:       Joi.string().min(2).max(200).required(),
    description: Joi.string().max(2000).allow('', null),
    start_date:  Joi.date().iso().allow(null),
    end_date:    Joi.date().iso().min(Joi.ref('start_date')).allow(null),
    currency:    Joi.string().length(3).uppercase().default('INR'),
    is_public:   Joi.boolean().default(false),
  }),
};

const updateTripSchema = {
  body: Joi.object({
    title:       Joi.string().min(2).max(200),
    description: Joi.string().max(2000).allow('', null),
    start_date:  Joi.date().iso().allow(null),
    end_date:    Joi.date().iso().allow(null),
    currency:    Joi.string().length(3).uppercase(),
    is_public:   Joi.boolean(),
  }).min(1),
};

module.exports = { createTripSchema, updateTripSchema };
