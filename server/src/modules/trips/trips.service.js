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
      COALESCE(
        (
          SELECT json_agg(stop_data ORDER BY s.day_number, s.order_index)
          FROM (
            SELECT s.id, s.city_id, s.day_number, s.order_index, s.notes,
              json_build_object('id', c.id, 'name', c.name, 'country', c.country, 'image_url', c.image_url) AS city,
              COALESCE(
                (
                  SELECT json_agg(act_data ORDER BY sa.order_index)
                  FROM (
                    SELECT sa.id, sa.activity_id, sa.custom_name, sa.custom_note, sa.time_slot, sa.order_index,
                      json_build_object('name', ac.name, 'category', ac.category, 'description', ac.description) AS catalog_activity
                    FROM stop_activities sa
                    LEFT JOIN activity_catalog ac ON ac.id = sa.activity_id
                    WHERE sa.stop_id = s.id
                  ) act_data
                ), '[]'::json
              ) AS activities
            FROM stops s
            LEFT JOIN cities c ON c.id = s.city_id
            WHERE s.trip_id = t.id
          ) stop_data
        ), '[]'::json
      ) AS stops
    FROM trips t
    WHERE t.id = $1 AND t.user_id = $2`,
    [tripId, userId]
  );
  if (!result.rows[0]) throw ApiError.notFound('Trip not found');
  return result.rows[0];
};

const createTrip = async (userId, data) => {
  const { 
    title, description, destination, start_date, end_date, 
    currency = 'INR', budget = 0, status = 'planned', mood = null, is_public = false 
  } = data;
  
  const result = await query(
    `INSERT INTO trips (user_id, title, description, destination, start_date, end_date, currency, budget, status, mood, is_public)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
    [userId, title, description, destination, start_date, end_date, currency, budget, status, mood, is_public]
  );
  return result.rows[0];
};

const updateTrip = async (tripId, userId, data) => {
  const fields = [];
  const values = [];
  let i = 1;

  const allowed = [
    'title', 'description', 'destination', 'start_date', 'end_date', 
    'currency', 'budget', 'status', 'mood', 'is_public', 'cover_image'
  ];
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
