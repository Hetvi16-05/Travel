const Joi = require('joi');
const { BUDGET_CATEGORIES } = require('../../utils/constants');

const createBudgetItemSchema = {
  body: Joi.object({
    category: Joi.string().valid(...BUDGET_CATEGORIES).required(),
    label:    Joi.string().min(1).max(200).required(),
    amount:   Joi.number().min(0).required(),
    currency: Joi.string().length(3).uppercase().default('INR'),
    is_paid:  Joi.boolean().default(false),
    paid_date:Joi.date().iso().allow(null),
    notes:    Joi.string().max(500).allow('', null),
  }),
};

const updateBudgetItemSchema = {
  body: Joi.object({
    category: Joi.string().valid(...BUDGET_CATEGORIES),
    label:    Joi.string().min(1).max(200),
    amount:   Joi.number().min(0),
    currency: Joi.string().length(3).uppercase(),
    is_paid:  Joi.boolean(),
    paid_date:Joi.date().iso().allow(null),
    notes:    Joi.string().max(500).allow('', null),
  }).min(1),
};

module.exports = { createBudgetItemSchema, updateBudgetItemSchema };
