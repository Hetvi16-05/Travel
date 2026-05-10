const { query } = require('../../config/db');
const ApiError = require('../../utils/ApiError');
const { parsePagination, paginatedResponse } = require('../../utils/helpers');

const getActivities = async (queryParams) => {
  const { page, limit, offset } = parsePagination(queryParams);
  const { city_id, category, q } = queryParams;

  const conditions = [];
  const values = [];
  let i = 1;

  if (city_id)  { conditions.push(`city_id = $${i++}`);                 values.push(city_id); }
  if (category) { conditions.push(`category = $${i++}`);                values.push(category); }
  if (q)        { conditions.push(`LOWER(name) LIKE LOWER($${i++})`);   values.push(`%${q}%`); }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [dataResult, countResult] = await Promise.all([
    query(
      `SELECT ac.*, c.name AS city_name FROM activity_catalog ac
       LEFT JOIN cities c ON c.id = ac.city_id
       ${where} ORDER BY ac.name LIMIT $${i++} OFFSET $${i}`,
      [...values, limit, offset]
    ),
    query(`SELECT COUNT(*) FROM activity_catalog ${where}`, values),
  ]);

  return paginatedResponse(dataResult.rows, parseInt(countResult.rows[0].count), page, limit);
};

const addActivityToStop = async (stopId, data) => {
  const { activity_id, custom_name, custom_note, time_slot, order_index = 0 } = data;
  const result = await query(
    `INSERT INTO stop_activities (stop_id, activity_id, custom_name, custom_note, time_slot, order_index)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [stopId, activity_id, custom_name, custom_note, time_slot, order_index]
  );
  return result.rows[0];
};

const removeActivityFromStop = async (stopActivityId, stopId) => {
  const result = await query(
    'DELETE FROM stop_activities WHERE id = $1 AND stop_id = $2 RETURNING id',
    [stopActivityId, stopId]
  );
  if (!result.rows[0]) throw ApiError.notFound('Activity not found');
};

module.exports = { getActivities, addActivityToStop, removeActivityFromStop };
