const { query } = require('../../config/db');
const ApiError = require('../../utils/ApiError');
const { generateShareToken } = require('../../utils/helpers');
const aiService = require('../ai/ai.service');

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
          SELECT json_agg(stop_data ORDER BY stop_data.day_number, stop_data.order_index)
          FROM (
            SELECT s.id, s.city_id, s.day_number, s.order_index, s.notes,
              json_build_object('id', c.id, 'name', c.name, 'country', c.country, 'image_url', c.image_url) AS city,
              COALESCE(
                (
                  SELECT json_agg(act_data ORDER BY act_data.order_index)
                  FROM (
                    SELECT sa.id, sa.activity_id, sa.order_index,
                      COALESCE(sa.custom_name, ac.name) AS title,
                      COALESCE(sa.custom_note, ac.description) AS description,
                      TO_CHAR(sa.time_slot, 'HH24:MI') AS time,
                      ac.category AS type,
                      ac.price_est AS cost,
                      c.name AS location
                    FROM stop_activities sa
                    LEFT JOIN activity_catalog ac ON ac.id = sa.activity_id
                    LEFT JOIN stops s2 ON s2.id = sa.stop_id
                    LEFT JOIN cities c ON c.id = s2.city_id
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

  const newTrip = result.rows[0];

  // Auto-populate itinerary if destination is provided
  if (destination) {
    try {
      await autoPopulateTrip(newTrip);
    } catch (err) {
      console.error('Auto-populate failed:', err);
      // Don't fail trip creation if auto-populate fails
    }
  }

  return newTrip;
};

/**
 * Automatically adds stops and activities to a trip based on its destination
 */
const autoPopulateTrip = async (trip) => {
  // 1. Find the city
  const cityRes = await query(
    'SELECT id, name FROM cities WHERE name ILIKE $1 OR $1 ILIKE name || \'%\' LIMIT 1',
    [trip.destination]
  );
  if (!cityRes.rows[0]) return;
  const city = cityRes.rows[0];

  // 2. Determine duration (default 3 days)
  let days = 3;
  if (trip.start_date && trip.end_date) {
    const start = new Date(trip.start_date);
    const end = new Date(trip.end_date);
    days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);
  }
  days = Math.min(days, 10); // Cap at 10 for auto-pop

  // 3. Get activities for this city
  const actRes = await query(
    'SELECT id, name, description, category, price_est FROM activity_catalog WHERE city_id = $1 ORDER BY RANDOM() LIMIT $2',
    [city.id, days * 3]
  );
  const pool = actRes.rows;
  if (pool.length === 0) return;

  // 4. Create stops and activities
  for (let d = 1; d <= days; d++) {
    const stopRes = await query(
      'INSERT INTO stops (trip_id, city_id, day_number, order_index) VALUES ($1, $2, $3, $4) RETURNING id',
      [trip.id, city.id, d, d - 1]
    );
    const stopId = stopRes.rows[0].id;

    // Pick 3 activities for this day
    const dayActs = pool.splice(0, 3);
    for (let i = 0; i < dayActs.length; i++) {
      const act = dayActs[i];
      const timeSlots = ['09:00:00', '14:00:00', '19:00:00'];
      await query(
        'INSERT INTO stop_activities (stop_id, activity_id, time_slot, order_index) VALUES ($1, $2, $3, $4)',
        [stopId, act.id, timeSlots[i] || '10:00:00', i]
      );
    }
  }
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

/**
 * Uses the advanced AI service to populate a trip with a smart itinerary
 */
const aiPopulateTrip = async (tripId, userId) => {
  // 1. Get the trip
  const tripResult = await query('SELECT * FROM trips WHERE id = $1 AND user_id = $2', [tripId, userId]);
  const trip = tripResult.rows[0];
  if (!trip) throw ApiError.notFound('Trip not found');

  // 2. Clear existing stops (if any)
  await query('DELETE FROM stops WHERE trip_id = $1', [tripId]);

  // 3. Generate plan via AI Service
  const prompt = `Plan a ${trip.destination} trip for ${trip.budget} budget with ${trip.mood || 'moderate'} vibe.`;
  const aiPlan = await aiService.generatePlan(prompt, []);

  if (aiPlan.type !== 'plan' || !aiPlan.itinerary) {
    throw ApiError.badRequest('AI could not generate a plan for this destination');
  }

  const { itinerary } = aiPlan;

  // 4. Save to DB
  for (const day of itinerary.days) {
    // Find city ID for this day's city (or use destination's city)
    const cityRes = await query('SELECT id FROM cities WHERE name ILIKE $1 LIMIT 1', [itinerary.cityName]);
    const cityId = cityRes.rows[0]?.id;

    if (!cityId) continue;

    const stopRes = await query(
      'INSERT INTO stops (trip_id, city_id, day_number, order_index) VALUES ($1, $2, $3, $4) RETURNING id',
      [tripId, cityId, day.day, day.day - 1]
    );
    const stopId = stopRes.rows[0].id;

    for (let i = 0; i < day.activities.length; i++) {
      const act = day.activities[i];
      
      // Try to find activity in catalog or insert as custom
      const catRes = await query('SELECT id FROM activity_catalog WHERE name ILIKE $1 LIMIT 1', [act.title]);
      const activity_id = catRes.rows[0]?.id || null;

      await query(
        `INSERT INTO stop_activities (stop_id, activity_id, custom_name, custom_note, time_slot, order_index)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          stopId, 
          activity_id, 
          activity_id ? null : act.title, 
          act.description, 
          act.time === 'Morning' ? '09:00:00' : act.time === 'Afternoon' ? '14:00:00' : '19:00:00',
          i
        ]
      );
    }
  }

  return { success: true };
};

module.exports = { 
  getAllTrips, 
  getTripById, 
  createTrip, 
  updateTrip, 
  deleteTrip, 
  generateShare,
  aiPopulateTrip
};
