const Joi = require('joi');

const createStopSchema = {
  body: Joi.object({
    city_id:     Joi.string().uuid().allow(null),
    day_number:  Joi.number().integer().min(1).required(),
    order_index: Joi.number().integer().min(0),
    notes:       Joi.string().max(2000).allow('', null),
  }),
};

const updateStopSchema = {
  body: Joi.object({
    city_id:     Joi.string().uuid().allow(null),
    day_number:  Joi.number().integer().min(1),
    order_index: Joi.number().integer().min(0),
    notes:       Joi.string().max(2000).allow('', null),
  }).min(1),
};

module.exports = { createStopSchema, updateStopSchema };
