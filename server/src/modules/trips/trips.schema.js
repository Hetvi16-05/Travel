const Joi = require('joi');

const createTripSchema = {
  body: Joi.object({
    title:       Joi.string().min(2).max(200).required(),
    description: Joi.string().max(2000).allow('', null),
    destination: Joi.string().max(255).allow('', null),
    start_date:  Joi.date().iso().allow(null),
    end_date:    Joi.date().iso().allow(null),
    currency:    Joi.string().length(3).uppercase().default('INR'),
    budget:      Joi.number().min(0).default(0),
    mood:        Joi.string().max(50).allow('', null),
    status:      Joi.string().valid('planned', 'upcoming', 'completed', 'cancelled').default('planned'),
    is_public:   Joi.boolean().default(false),
  }),
};

const updateTripSchema = {
  body: Joi.object({
    title:       Joi.string().min(2).max(200),
    description: Joi.string().max(2000).allow('', null),
    destination: Joi.string().max(255).allow('', null),
    start_date:  Joi.date().iso().allow(null),
    end_date:    Joi.date().iso().allow(null),
    currency:    Joi.string().length(3).uppercase(),
    budget:      Joi.number().min(0),
    mood:        Joi.string().max(50).allow('', null),
    status:      Joi.string().valid('planned', 'upcoming', 'completed', 'cancelled'),
    is_public:   Joi.boolean(),
  }).min(1),
};

module.exports = { createTripSchema, updateTripSchema };
