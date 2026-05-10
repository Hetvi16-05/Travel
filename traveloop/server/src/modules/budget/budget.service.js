const { query } = require('../../config/db');
const ApiError = require('../../utils/ApiError');

const assertTripOwner = async (tripId, userId) => {
  const r = await query('SELECT id FROM trips WHERE id = $1 AND user_id = $2', [tripId, userId]);
  if (!r.rows[0]) throw ApiError.forbidden('Access denied');
};

const getBudgetItems = async (tripId, userId) => {
  await assertTripOwner(tripId, userId);
  const result = await query(
    `SELECT * FROM budget_items WHERE trip_id = $1 ORDER BY category, created_at`,
    [tripId]
  );
  const summary = await query(
    `SELECT
       SUM(amount) AS total,
       SUM(CASE WHEN is_paid THEN amount ELSE 0 END) AS paid,
       SUM(CASE WHEN NOT is_paid THEN amount ELSE 0 END) AS unpaid
     FROM budget_items WHERE trip_id = $1`,
    [tripId]
  );
  return { items: result.rows, summary: summary.rows[0] };
};

const createBudgetItem = async (tripId, userId, data) => {
  await assertTripOwner(tripId, userId);
  const { category, label, amount, currency = 'INR', is_paid = false, paid_date, notes } = data;
  const result = await query(
    `INSERT INTO budget_items (trip_id, category, label, amount, currency, is_paid, paid_date, notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [tripId, category, label, amount, currency, is_paid, paid_date, notes]
  );
  return result.rows[0];
};

const updateBudgetItem = async (itemId, tripId, userId, data) => {
  await assertTripOwner(tripId, userId);
  const fields = [];
  const values = [];
  let i = 1;
  ['category','label','amount','currency','is_paid','paid_date','notes'].forEach((k) => {
    if (data[k] !== undefined) { fields.push(`${k} = $${i++}`); values.push(data[k]); }
  });
  fields.push(`updated_at = NOW()`);
  values.push(itemId, tripId);
  const result = await query(
    `UPDATE budget_items SET ${fields.join(', ')} WHERE id = $${i++} AND trip_id = $${i} RETURNING *`,
    values
  );
  if (!result.rows[0]) throw ApiError.notFound('Budget item not found');
  return result.rows[0];
};

const deleteBudgetItem = async (itemId, tripId, userId) => {
  await assertTripOwner(tripId, userId);
  const result = await query(
    'DELETE FROM budget_items WHERE id = $1 AND trip_id = $2 RETURNING id',
    [itemId, tripId]
  );
  if (!result.rows[0]) throw ApiError.notFound('Budget item not found');
};

module.exports = { getBudgetItems, createBudgetItem, updateBudgetItem, deleteBudgetItem };
