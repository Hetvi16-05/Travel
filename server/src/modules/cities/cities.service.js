const { query } = require('../../config/db');
const ApiError = require('../../utils/ApiError');
const { parsePagination, paginatedResponse } = require('../../utils/helpers');

const searchCities = async (queryParams) => {
  const { page, limit, offset } = parsePagination(queryParams);
  const search = queryParams.q ? `%${queryParams.q}%` : '%';

  const [dataResult, countResult] = await Promise.all([
    query(
      `SELECT * FROM cities WHERE is_active = TRUE
       AND (LOWER(name) LIKE LOWER($1) OR LOWER(country) LIKE LOWER($1))
       ORDER BY name ASC LIMIT $2 OFFSET $3`,
      [search, limit, offset]
    ),
    query(
      `SELECT COUNT(*) FROM cities WHERE is_active = TRUE
       AND (LOWER(name) LIKE LOWER($1) OR LOWER(country) LIKE LOWER($1))`,
      [search]
    ),
  ]);

  return paginatedResponse(dataResult.rows, parseInt(countResult.rows[0].count), page, limit);
};

const getCityById = async (id) => {
  const result = await query('SELECT * FROM cities WHERE id = $1 AND is_active = TRUE', [id]);
  if (!result.rows[0]) throw ApiError.notFound('City not found');
  return result.rows[0];
};

module.exports = { searchCities, getCityById };
