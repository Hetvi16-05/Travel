const { query } = require('../../config/db');
const ApiError = require('../../utils/ApiError');

const getSharedTrip = async (shareToken) => {
  const result = await query(
    `SELECT t.*,
       u.name AS owner_name,
       json_agg(
         json_build_object(
           'id', s.id, 'city_id', s.city_id, 'day_number', s.day_number,
           'order_index', s.order_index, 'notes', s.notes,
           'city', json_build_object('id', c.id, 'name', c.name, 'country', c.country, 'image_url', c.image_url)
         ) ORDER BY s.day_number, s.order_index
       ) FILTER (WHERE s.id IS NOT NULL) AS stops
     FROM trips t
     JOIN users u ON u.id = t.user_id
     LEFT JOIN stops s ON s.trip_id = t.id
     LEFT JOIN cities c ON c.id = s.city_id
     WHERE t.share_token = $1 AND t.is_public = TRUE
     GROUP BY t.id, u.name`,
    [shareToken]
  );

  if (!result.rows[0]) throw ApiError.notFound('Shared trip not found or no longer public');
  return result.rows[0];
};

module.exports = { getSharedTrip };
