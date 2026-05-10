const Joi = require('joi');

const searchSchema = {
  query: Joi.object({
    city_id:  Joi.string().uuid(),
    category: Joi.string(),
    q:        Joi.string().allow(''),
    page:     Joi.number().integer().min(1),
    limit:    Joi.number().integer().min(1).max(100),
  }),
};

const addToStopSchema = {
  body: Joi.object({
    activity_id:  Joi.string().uuid().allow(null),
    custom_name:  Joi.string().max(200).allow('', null),
    custom_note:  Joi.string().max(500).allow('', null),
    time_slot:    Joi.string().allow(null),
    order_index:  Joi.number().integer().min(0),
  }),
};

module.exports = { searchSchema, addToStopSchema };
