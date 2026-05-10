const Joi = require('joi');

const saveDestinationSchema = {
  body: Joi.object({
    city_id: Joi.string().uuid().required(),
  }),
};

module.exports = { saveDestinationSchema };
