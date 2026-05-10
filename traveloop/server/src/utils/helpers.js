const { v4: uuidv4 } = require('uuid');
const { PAGINATION } = require('./constants');

/**
 * Generate a short random share token
 */
const generateShareToken = () => uuidv4().replace(/-/g, '').slice(0, 16);

/**
 * Parse and validate pagination query params
 */
const parsePagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || PAGINATION.DEFAULT_PAGE);
  const limit = Math.min(
    parseInt(query.limit) || PAGINATION.DEFAULT_LIMIT,
    PAGINATION.MAX_LIMIT
  );
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

/**
 * Build a paginated response object
 */
const paginatedResponse = (data, total, page, limit) => ({
  data,
  pagination: {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  },
});

/**
 * Strip sensitive fields from a user object
 */
const sanitizeUser = (user) => {
  const { password_hash, ...safe } = user;
  return safe;
};

/**
 * Format a date to ISO date string (YYYY-MM-DD)
 */
const toDateString = (date) => new Date(date).toISOString().split('T')[0];

module.exports = {
  generateShareToken,
  parsePagination,
  paginatedResponse,
  sanitizeUser,
  toDateString,
};
