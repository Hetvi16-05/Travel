const { query } = require('../../config/db');
const ApiError = require('../../utils/ApiError');
const { generateShareToken } = require('../../utils/helpers');

const getAllTrips = async (userId) => {
  const result = await query(
    `SELECT t.*, COUNT(DISTINCT s.id)::int AS stop_count
     FROM trips t
     LEFT JOIN stops s ON s.trip_id = t.id
     WHERE t.user_id = $1
     GROUP BY t.id
     ORDER BY t.created_at DESC`,
    [userId]
  );
  return result.rows;
};

const getTripById = async (tripId, userId) => {
  const result = await query(
    `SELECT t.*,
       json_agg(
         json_build_object(
           'id', s.id, 'city_id', s.city_id, 'day_number', s.day_number,
           'order_index', s.order_index, 'notes', s.notes,
           'city', json_build_object('id', c.id, 'name', c.name, 'country', c.country, 'image_url', c.image_url)
         ) ORDER BY s.day_number, s.order_index
       ) FILTER (WHERE s.id IS NOT NULL) AS stops
     FROM trips t
     LEFT JOIN stops s ON s.trip_id = t.id
     LEFT JOIN cities c ON c.id = s.city_id
     WHERE t.id = $1 AND t.user_id = $2
     GROUP BY t.id`,
    [tripId, userId]
  );
  if (!result.rows[0]) throw ApiError.notFound('Trip not found');
  return result.rows[0];
};

const createTrip = async (userId, data) => {
  const { title, description, start_date, end_date, currency = 'INR', is_public = false } = data;
  const result = await query(
    `INSERT INTO trips (user_id, title, description, start_date, end_date, currency, is_public)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [userId, title, description, start_date, end_date, currency, is_public]
  );
  return result.rows[0];
};

const updateTrip = async (tripId, userId, data) => {
  const fields = [];
  const values = [];
  let i = 1;

  const allowed = ['title', 'description', 'start_date', 'end_date', 'currency', 'is_public', 'cover_image'];
  allowed.forEach((key) => {
    if (data[key] !== undefined) {
      fields.push(`${key} = $${i++}`);
      values.push(data[key]);
    }
  });

  if (fields.length === 0) throw ApiError.badRequest('No fields to update');
  fields.push(`updated_at = NOW()`);
  values.push(tripId, userId);

  const result = await query(
    `UPDATE trips SET ${fields.join(', ')} WHERE id = $${i++} AND user_id = $${i} RETURNING *`,
    values
  );
  if (!result.rows[0]) throw ApiError.notFound('Trip not found');
  return result.rows[0];
};

const deleteTrip = async (tripId, userId) => {
  const result = await query(
    'DELETE FROM trips WHERE id = $1 AND user_id = $2 RETURNING id',
    [tripId, userId]
  );
  if (!result.rows[0]) throw ApiError.notFound('Trip not found');
};

const generateShare = async (tripId, userId) => {
  const token = generateShareToken();
  const result = await query(
    `UPDATE trips SET share_token = $1, is_public = TRUE, updated_at = NOW()
     WHERE id = $2 AND user_id = $3 RETURNING share_token`,
    [token, tripId, userId]
  );
  if (!result.rows[0]) throw ApiError.notFound('Trip not found');
  return result.rows[0].share_token;
};

module.exports = { getAllTrips, getTripById, createTrip, updateTrip, deleteTrip, generateShare };
