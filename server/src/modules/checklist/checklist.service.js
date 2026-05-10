const { query } = require('../../config/db');
const ApiError = require('../../utils/ApiError');

const assertTripOwner = async (tripId, userId) => {
  const r = await query('SELECT id FROM trips WHERE id = $1 AND user_id = $2', [tripId, userId]);
  if (!r.rows[0]) throw ApiError.forbidden('Access denied');
};

const getItems = async (tripId, userId) => {
  await assertTripOwner(tripId, userId);
  const result = await query(
    'SELECT * FROM checklist_items WHERE trip_id = $1 ORDER BY category, order_index',
    [tripId]
  );
  return result.rows;
};

const createItem = async (tripId, userId, data) => {
  await assertTripOwner(tripId, userId);
  const { label, category = 'misc', order_index = 0 } = data;
  const result = await query(
    `INSERT INTO checklist_items (trip_id, label, category, order_index)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [tripId, label, category, order_index]
  );
  return result.rows[0];
};

const toggleItem = async (itemId, tripId, userId) => {
  await assertTripOwner(tripId, userId);
  const result = await query(
    `UPDATE checklist_items SET is_done = NOT is_done, updated_at = NOW()
     WHERE id = $1 AND trip_id = $2 RETURNING *`,
    [itemId, tripId]
  );
  if (!result.rows[0]) throw ApiError.notFound('Checklist item not found');
  return result.rows[0];
};

const deleteItem = async (itemId, tripId, userId) => {
  await assertTripOwner(tripId, userId);
  const result = await query(
    'DELETE FROM checklist_items WHERE id = $1 AND trip_id = $2 RETURNING id',
    [itemId, tripId]
  );
  if (!result.rows[0]) throw ApiError.notFound('Checklist item not found');
};

module.exports = { getItems, createItem, toggleItem, deleteItem };
