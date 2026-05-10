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

module.exports = { getMe, updateMe, deleteMe, getSavedDestinations, saveDestination, unsaveDestination };
