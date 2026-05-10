const { query } = require('../../config/db');
const ApiError = require('../../utils/ApiError');

const getSavedDestinations = async (userId) => {
  const result = await query(
    `SELECT sd.id, sd.saved_at, c.* 
     FROM saved_destinations sd
     JOIN cities c ON c.id = sd.city_id
     WHERE sd.user_id = $1
     ORDER BY sd.saved_at DESC`,
    [userId]
  );
  return result.rows;
};

const saveDestination = async (userId, cityId) => {
  // Check if city exists
  const cityResult = await query('SELECT id FROM cities WHERE id = $1', [cityId]);
  if (!cityResult.rows[0]) throw ApiError.notFound('City not found');

  try {
    const result = await query(
      `INSERT INTO saved_destinations (user_id, city_id)
       VALUES ($1, $2)
       RETURNING *`,
      [userId, cityId]
    );
    return result.rows[0];
  } catch (error) {
    if (error.code === '23505') { // Unique violation
      throw ApiError.badRequest('Destination already saved');
    }
    throw error;
  }
};

const unsaveDestination = async (userId, cityId) => {
  const result = await query(
    'DELETE FROM saved_destinations WHERE user_id = $1 AND city_id = $2 RETURNING id',
    [userId, cityId]
  );
  if (!result.rows[0]) throw ApiError.notFound('Saved destination not found');
};

module.exports = {
  getSavedDestinations,
  saveDestination,
  unsaveDestination,
};
