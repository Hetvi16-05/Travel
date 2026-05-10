const { query } = require('../config/db');

/**
 * Update Co-occurrence & Popular Routes
 * Call this after trip mutations to keep recommendation signals fresh.
 * Non-blocking background function.
 */
async function updateCooccurrence(tripId) {
  try {
    // 1. Update city pairs co-occurrence
    await query(`
      INSERT INTO city_cooccurrence (city_a_id, city_b_id, frequency)
      SELECT s1.city_id, s2.city_id, 1
      FROM stops s1
      JOIN stops s2 ON s1.trip_id = s2.trip_id AND s1.city_id != s2.city_id
      WHERE s1.trip_id = $1 AND s1.city_id IS NOT NULL AND s2.city_id IS NOT NULL
      ON CONFLICT (city_a_id, city_b_id) DO UPDATE
        SET frequency = city_cooccurrence.frequency + 1,
            updated_at = NOW()
    `, [tripId]);

    // 2. Update sequential routes
    await query(`
      INSERT INTO popular_routes (origin_city, dest_city, frequency, avg_days_stay)
      SELECT s1.city_id, s2.city_id, 1, 3
      FROM stops s1
      JOIN stops s2 ON s1.trip_id = s2.trip_id AND s2.order_index = s1.order_index + 1
      WHERE s1.trip_id = $1 AND s1.city_id IS NOT NULL AND s2.city_id IS NOT NULL
      ON CONFLICT (origin_city, dest_city) DO UPDATE
        SET frequency = popular_routes.frequency + 1,
            updated_at = NOW()
    `, [tripId]);

    console.log(`[Intelligence] Updated co-occurrence for trip ${tripId}`);
  } catch (err) {
    console.error('[Intelligence Error]', err.message);
  }
}

module.exports = { updateCooccurrence };
