const { query } = require('../../config/db');
const ApiError = require('../../utils/ApiError');
const { sanitizeUser } = require('../../utils/helpers');

const getMe = async (userId) => {
  const result = await query(
    'SELECT id, name, email, role, avatar_url, created_at FROM users WHERE id = $1',
    [userId]
  );
  if (!result.rows[0]) throw ApiError.notFound('User not found');
  return result.rows[0];
};

const updateMe = async (userId, { name, avatar_url }) => {
  const fields = [];
  const values = [];
  let i = 1;

  if (name !== undefined)       { fields.push(`name = $${i++}`);       values.push(name); }
  if (avatar_url !== undefined) { fields.push(`avatar_url = $${i++}`); values.push(avatar_url); }

  fields.push(`updated_at = NOW()`);
  values.push(userId);

  const result = await query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = $${i} RETURNING id, name, email, role, avatar_url, created_at`,
    values
  );
  return result.rows[0];
};

const deleteMe = async (userId) => {
  await query('UPDATE users SET is_active = FALSE WHERE id = $1', [userId]);
};

const getSavedDestinations = async (userId) => {
  const result = await query(
    `SELECT c.* FROM saved_destinations sd
     JOIN cities c ON c.id = sd.city_id
     WHERE sd.user_id = $1
     ORDER BY sd.saved_at DESC`,
    [userId]
  );
  return result.rows;
};

const saveDestination = async (userId, cityId) => {
  await query(
    `INSERT INTO saved_destinations (user_id, city_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
    [userId, cityId]
  );
};

const unsaveDestination = async (userId, cityId) => {
  await query(
    'DELETE FROM saved_destinations WHERE user_id = $1 AND city_id = $2',
    [userId, cityId]
  );
};

const getUserStats = async (userId) => {
  const [trips, saved, locations] = await Promise.all([
    query('SELECT COUNT(*) FROM trips WHERE user_id = $1', [userId]),
    query('SELECT COUNT(*) FROM saved_destinations WHERE user_id = $1', [userId]),
    query(`
      SELECT 
        COUNT(DISTINCT c.name) as cities_visited,
        COUNT(DISTINCT c.country) as countries_visited
      FROM trips t
      JOIN stops s ON s.trip_id = t.id
      JOIN cities c ON c.id = s.city_id
      WHERE t.user_id = $1
    `, [userId])
  ]);

  return {
    trips_planned: parseInt(trips.rows[0].count),
    saved_places: parseInt(saved.rows[0].count),
    cities_visited: parseInt(locations.rows[0].cities_visited),
    countries_visited: parseInt(locations.rows[0].countries_visited),
    distance_traveled: parseInt(trips.rows[0].count) * 1250, // estimated
    ai_savings: parseInt(trips.rows[0].count) * 1800 // estimated
  };
};

module.exports = { getMe, updateMe, deleteMe, getSavedDestinations, saveDestination, unsaveDestination, getUserStats };
