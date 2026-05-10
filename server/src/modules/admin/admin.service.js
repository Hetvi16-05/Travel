const { query } = require('../../config/db');
const ApiError = require('../../utils/ApiError');
const { parsePagination, paginatedResponse } = require('../../utils/helpers');

const getStats = async () => {
  const [users, trips, cities] = await Promise.all([
    query('SELECT COUNT(*) FROM users WHERE is_active = TRUE'),
    query('SELECT COUNT(*) FROM trips'),
    query('SELECT COUNT(*) FROM cities WHERE is_active = TRUE'),
  ]);
  return {
    totalUsers: parseInt(users.rows[0].count),
    totalTrips: parseInt(trips.rows[0].count),
    totalCities: parseInt(cities.rows[0].count),
  };
};

const getUsers = async (queryParams) => {
  const { page, limit, offset } = parsePagination(queryParams);
  const [data, count] = await Promise.all([
    query(
      `SELECT id, name, email, role, is_active, created_at FROM users
       ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    ),
    query('SELECT COUNT(*) FROM users'),
  ]);
  return paginatedResponse(data.rows, parseInt(count.rows[0].count), page, limit);
};

const createCity = async (data) => {
  const { name, country, description, image_url, lat, lng } = data;
  const result = await query(
    `INSERT INTO cities (name, country, description, image_url, lat, lng)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [name, country, description, image_url, lat, lng]
  );
  return result.rows[0];
};

const deleteCity = async (cityId) => {
  await query('UPDATE cities SET is_active = FALSE WHERE id = $1', [cityId]);
};

module.exports = { getStats, getUsers, createCity, deleteCity };
