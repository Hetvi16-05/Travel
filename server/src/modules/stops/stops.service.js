const { query } = require('../../config/db');
const ApiError = require('../../utils/ApiError');

const assertTripOwner = async (tripId, userId) => {
  const r = await query('SELECT id FROM trips WHERE id = $1 AND user_id = $2', [tripId, userId]);
  if (!r.rows[0]) throw ApiError.forbidden('Access denied');
};

const getStops = async (tripId, userId) => {
  await assertTripOwner(tripId, userId);
  const result = await query(
    `SELECT s.*, c.name AS city_name, c.country, c.image_url AS city_image
     FROM stops s LEFT JOIN cities c ON c.id = s.city_id
     WHERE s.trip_id = $1 ORDER BY s.day_number, s.order_index`,
    [tripId]
  );
  return result.rows;
};

const createStop = async (tripId, userId, data) => {
  await assertTripOwner(tripId, userId);
  const { city_id, day_number, order_index = 0, notes } = data;
  const result = await query(
    `INSERT INTO stops (trip_id, city_id, day_number, order_index, notes)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [tripId, city_id, day_number, order_index, notes]
  );
  return result.rows[0];
};

const updateStop = async (stopId, tripId, userId, data) => {
  await assertTripOwner(tripId, userId);
  const fields = [];
  const values = [];
  let i = 1;
  ['city_id', 'day_number', 'order_index', 'notes'].forEach((k) => {
    if (data[k] !== undefined) { fields.push(`${k} = $${i++}`); values.push(data[k]); }
  });
  fields.push(`updated_at = NOW()`);
  values.push(stopId, tripId);
  const result = await query(
    `UPDATE stops SET ${fields.join(', ')} WHERE id = $${i++} AND trip_id = $${i} RETURNING *`,
    values
  );
  if (!result.rows[0]) throw ApiError.notFound('Stop not found');
  return result.rows[0];
};

const deleteStop = async (stopId, tripId, userId) => {
  await assertTripOwner(tripId, userId);
  const result = await query(
    'DELETE FROM stops WHERE id = $1 AND trip_id = $2 RETURNING id',
    [stopId, tripId]
  );
  if (!result.rows[0]) throw ApiError.notFound('Stop not found');
};

module.exports = { getStops, createStop, updateStop, deleteStop };
