const { query } = require('../../config/db');
const ApiError = require('../../utils/ApiError');

const getSharedTrip = async (shareToken) => {
  const result = await query(
    `SELECT t.*,
      u.name AS owner_name,
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
    JOIN users u ON u.id = t.user_id
    WHERE t.share_token = $1 AND t.is_public = TRUE`,
    [shareToken]
  );

  if (!result.rows[0]) throw ApiError.notFound('Shared trip not found or no longer public');
  return result.rows[0];
};

module.exports = { getSharedTrip };
