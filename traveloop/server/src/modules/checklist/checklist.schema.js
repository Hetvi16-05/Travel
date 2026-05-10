const Joi = require('joi');
const { CHECKLIST_CATEGORIES } = require('../../utils/constants');

const createItemSchema = {
  body: Joi.object({
    label:       Joi.string().min(1).max(300).required(),
    category:    Joi.string().valid(...CHECKLIST_CATEGORIES).default('misc'),
    order_index: Joi.number().integer().min(0),
  }),
};

module.exports = { createItemSchema };
