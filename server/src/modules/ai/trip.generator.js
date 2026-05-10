const { query } = require('../../config/db');

/**
 * Trip Generator
 * Algorithm:
 * 1. Score candidate cities matching the region/style constraints
 * 2. Pick top cities, allocate days
 * 3. Order cities geographically
 * 4. Create stops in DB
 * 5. Assign activities matching budget and style
 */

async function generateItinerary(tripId, userId, params) {
  const {
    days = 7,
    budget,
    region,
    style = 'moderate',
    startDate = new Date().toISOString().split('T')[0],
  } = params;

  // 1. Determine how many cities (rule: 1 city per 2-4 days)
  const numCities = Math.max(1, Math.min(Math.floor(days / 2.5), 5));
  const daysPerCity = Math.floor(days / numCities);
  const extraDays = days - (daysPerCity * numCities);

  // 2. Score and pick cities
  const cityResult = await query(`
    SELECT c.*,
      (COALESCE(c.popularity_score, 50) * 0.4
      + COALESCE(c.safety_score, 7.0) * 0.3
      + CASE
          WHEN $1::text IS NOT NULL AND LOWER(c.continent) = LOWER($1) THEN 5.0
          WHEN $1::text IS NOT NULL AND LOWER(c.country) = LOWER($1) THEN 10.0
          ELSE 0
        END
      + CASE
          WHEN $2 = 'budget'  AND c.avg_daily_cost < 60   THEN 5.0
          WHEN $2 = 'mid'     AND c.avg_daily_cost BETWEEN 60 AND 150 THEN 5.0
          WHEN $2 = 'luxury'  AND c.avg_daily_cost > 150  THEN 5.0
          ELSE 0
        END
      ) AS city_score
    FROM cities c
    WHERE c.is_active = TRUE
      AND c.id NOT IN (SELECT city_id FROM stops WHERE trip_id = $3 AND city_id IS NOT NULL)
    ORDER BY city_score DESC
    LIMIT 20
  `, [region, style, tripId]);

  let candidateCities = cityResult.rows;
  if (candidateCities.length === 0) {
    // Fallback: top cities globally
    const fallback = await query('SELECT * FROM cities WHERE is_active = TRUE ORDER BY popularity_score DESC LIMIT 10');
    candidateCities = fallback.rows;
  }

  // Pick top N
  const chosen = candidateCities.slice(0, numCities);
  
  // Simple "geographic" ordering (continent/country proximity)
  const ordered = chosen.sort((a, b) => {
    if (a.continent !== b.continent) return a.continent.localeCompare(b.continent);
    return a.country.localeCompare(b.country);
  });

  // 3. Create stops and activities in DB
  let currentDate = new Date(startDate);
  const actions = [];

  for (let i = 0; i < ordered.length; i++) {
    const city = ordered[i];
    const duration = daysPerCity + (i === ordered.length - 1 ? extraDays : 0);
    
    // Create Stop
    const stopResult = await query(`
      INSERT INTO stops (trip_id, city_id, day_number, order_index)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `, [tripId, city.id, i * daysPerCity + 1, i]);
    
    const stopId = stopResult.rows[0].id;

    // Pick activities for this city
    const activitiesResult = await query(`
      SELECT * FROM activity_catalog
      WHERE city_id = $1
      ORDER BY (add_count::float / GREATEST(view_count, 1)) DESC, RANDOM()
      LIMIT $2
    `, [city.id, duration * 3]);

    const activities = activitiesResult.rows;
    const timeSlots = ['09:00:00', '14:00:00', '19:00:00'];

    for (let d = 0; d < duration; d++) {
      const dayActivities = activities.splice(0, 3);
      for (let k = 0; k < dayActivities.length; k++) {
        const act = dayActivities[k];
        await query(`
          INSERT INTO stop_activities (stop_id, activity_id, time_slot, order_index)
          VALUES ($1, $2, $3, $4)
        `, [stopId, act.id, timeSlots[k], d * 3 + k]);
      }
    }

    // Add budget items for this stop
    const dailyBudget = budget ? (budget / days) : (city.avg_daily_cost || 100);
    
    await query(`
      INSERT INTO budget_items (trip_id, label, category, amount)
      VALUES ($1, $2, $3, $4)
    `, [tripId, `Accommodation in ${city.name}`, 'accommodation', dailyBudget * 0.4 * duration]);

    actions.push({
      city: city.name,
      country: city.country,
      days: duration,
      arrival: currentDate.toISOString().split('T')[0],
      activities: Math.min(duration * 3, activitiesResult.rows.length)
    });

    currentDate.setDate(currentDate.getDate() + duration);
  }

  return actions;
}

module.exports = { generateItinerary };
