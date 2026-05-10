const ApiError = require('../utils/ApiError');

/**
 * Joi validation middleware factory
 * @param {Object} schema - Joi schema object with optional body/query/params keys
 */
const validate = (schema) => (req, res, next) => {
  const errors = [];

  ['body', 'query', 'params'].forEach((key) => {
    if (schema[key]) {
      const { error } = schema[key].validate(req[key], { abortEarly: false });
      if (error) {
        error.details.forEach((d) => errors.push(d.message));
      }
    }
  });

  if (errors.length > 0) {
    throw ApiError.badRequest('Validation failed', errors);
  }

  next();
};

module.exports = validate;
