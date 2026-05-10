const Joi = require('joi');

const createNoteSchema = {
  body: Joi.object({
    title:   Joi.string().max(200).allow('', null),
    content: Joi.string().min(1).required(),
  }),
};

const updateNoteSchema = {
  body: Joi.object({
    title:   Joi.string().max(200).allow('', null),
    content: Joi.string().min(1),
  }).min(1),
};

module.exports = { createNoteSchema, updateNoteSchema };
