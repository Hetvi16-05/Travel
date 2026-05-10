const { query } = require('../../config/db');

/**
 * Recommendation Service
 * Implements an in-house recommendation engine using three strategies:
 * A: Collaborative Filtering (Users like you)
 * B: Content-Based (Matching tags and preferences)
 * C: Popularity & Co-occurrence (Trending and "Visit next")
 */

const getCityRecommendations = async (userId) => {
  // 1. Get user preferences
  const prefResult = await query('SELECT * FROM user_preferences WHERE user_id = $1', [userId]);
  const prefs = prefResult.rows[0];

  const travelStyle = prefs?.travel_style || [];
  const budgetPref = prefs?.preferred_budget || 'mid';
  const groupType = prefs?.preferred_group || 'solo';

  // 2. Strategy A: Collaborative Filtering
  // Find users who visited similar cities and see what else they visited
  const collaborativeSql = `
    WITH my_cities AS (
      SELECT DISTINCT s.city_id
      FROM stops s JOIN trips t ON t.id = s.trip_id
      WHERE t.user_id = $1
    ),
    similar_users AS (
      SELECT DISTINCT t.user_id, COUNT(DISTINCT s.city_id) AS overlap
      FROM stops s
      JOIN trips t ON t.id = s.trip_id
      WHERE s.city_id IN (SELECT city_id FROM my_cities)
        AND t.user_id != $1
      GROUP BY t.user_id
      HAVING COUNT(DISTINCT s.city_id) >= 1
      ORDER BY overlap DESC
      LIMIT 20
    ),
    candidate_cities AS (
      SELECT s.city_id, SUM(su.overlap) AS relevance_score
      FROM stops s
      JOIN trips t ON t.id = s.trip_id
      JOIN similar_users su ON su.user_id = t.user_id
      WHERE s.city_id NOT IN (SELECT city_id FROM my_cities)
      GROUP BY s.city_id
    )
    SELECT c.*, cc.relevance_score,
           'collaborative' AS strategy,
           'Visited by travelers like you' AS reason
    FROM candidate_cities cc
    JOIN cities c ON c.id = cc.city_id
    ORDER BY cc.relevance_score DESC
    LIMIT 15
  `;

  // 3. Strategy B: Content-Based
  // Cities that match user tags and budget
  const contentSql = `
    SELECT c.*,
      (
        COALESCE(array_length(ARRAY(SELECT unnest(c.tags) INTERSECT SELECT unnest($2::text[])), 1), 0) * 2.0
        + CASE
            WHEN $3 = 'budget'  AND c.avg_daily_cost < 60   THEN 3
            WHEN $3 = 'mid'     AND c.avg_daily_cost BETWEEN 60 AND 150 THEN 3
            WHEN $3 = 'luxury'  AND c.avg_daily_cost > 150  THEN 3
            ELSE 0
          END
        + CASE WHEN $4 = 'family' AND c.family_friendly THEN 2 ELSE 0 END
        + (c.safety_score * 0.3)
      ) AS match_score,
      'content' AS strategy,
      'Matches your travel style' AS reason
    FROM cities c
    WHERE c.id NOT IN (
      SELECT DISTINCT s.city_id FROM stops s
      JOIN trips t ON t.id = s.trip_id
      WHERE t.user_id = $1
    )
    ORDER BY match_score DESC
    LIMIT 15
  `;

  // 4. Strategy C: Popularity & Co-occurrence
  const popularitySql = `
    SELECT c.*,
      (COALESCE(c.popularity_score, 50) * 0.5
      + COALESCE(coc.frequency, 0) * 1.0) AS pop_score,
      'popular' AS strategy,
      CASE
        WHEN coc.frequency > 0 THEN 'Often visited with your destinations'
        ELSE 'Trending destination'
      END AS reason
    FROM cities c
    LEFT JOIN city_cooccurrence coc ON
      coc.city_b_id = c.id
      AND coc.city_a_id IN (
        SELECT DISTINCT s.city_id FROM stops s
        JOIN trips t ON t.id = s.trip_id
        WHERE t.user_id = $1
      )
    WHERE c.id NOT IN (
      SELECT DISTINCT s.city_id FROM stops s
      JOIN trips t ON t.id = s.trip_id
      WHERE t.user_id = $1
    )
    ORDER BY pop_score DESC
    LIMIT 15
  `;

  const [collabRes, contentRes, popRes] = await Promise.all([
    query(collaborativeSql, [userId]),
    query(contentSql, [userId, travelStyle, budgetPref, groupType]),
    query(popularitySql, [userId])
  ]);

  // Merge and normalize results
  const mergeResults = (results, weight) => {
    const maxScore = Math.max(...results.map(r => parseFloat(r.relevance_score || r.match_score || r.pop_score) || 0), 1);
    return results.map(r => ({
      ...r,
      normalized_score: (parseFloat(r.relevance_score || r.match_score || r.pop_score) || 0) / maxScore * weight
    }));
  };

  const mergedMap = new Map();
  const process = (items) => {
    items.forEach(item => {
      if (mergedMap.has(item.id)) {
        const existing = mergedMap.get(item.id);
        existing.final_score += item.normalized_score;
        existing.strategies.push(item.strategy);
      } else {
        mergedMap.set(item.id, {
          ...item,
          final_score: item.normalized_score,
          strategies: [item.strategy]
        });
      }
    });
  };

  process(mergeResults(collabRes.rows, 1.0));
  process(mergeResults(contentRes.rows, 1.2)); // Slightly favor content match
  process(mergeResults(popRes.rows, 0.8));

  return [...mergedMap.values()]
    .sort((a, b) => b.final_score - a.final_score)
    .slice(0, 12)
    .map(c => ({
      ...c,
      confidence: Math.min(Math.round(c.final_score * 100), 99),
      why: c.reason
    }));
};

const getActivityRecommendations = async (stopId, userId) => {
  const stopRes = await query('SELECT city_id FROM stops WHERE id = $1', [stopId]);
  const stop = stopRes.rows[0];
  if (!stop) return [];

  const prefResult = await query('SELECT travel_style, preferred_group FROM user_preferences WHERE user_id = $1', [userId]);
  const prefs = prefResult.rows[0];

  const activitiesRes = await query(`
    SELECT ac.*,
      (
        (ac.add_count::float / GREATEST(ac.view_count, 1)) * 5
        + CASE WHEN ac.tags && $2::text[] THEN 3.0 ELSE 0 END
        + CASE WHEN ac.best_for @> ARRAY[$3::text] THEN 2.0 ELSE 0 END
      ) AS rec_score
    FROM activity_catalog ac
    WHERE ac.city_id = $1
      AND ac.id NOT IN (
        SELECT activity_id FROM stop_activities WHERE stop_id = $4 AND activity_id IS NOT NULL
      )
    ORDER BY rec_score DESC
    LIMIT 8
  `, [stop.city_id, prefs?.travel_style || [], prefs?.preferred_group || 'solo', stopId]);

  return activitiesRes.rows;
};

const getNextCityRecommendation = async (tripId, userId) => {
  const lastStopRes = await query(`
    SELECT s.city_id, c.name, c.continent
    FROM stops s
    JOIN cities c ON c.id = s.city_id
    WHERE s.trip_id = $1
    ORDER BY s.day_number DESC, s.order_index DESC
    LIMIT 1
  `, [tripId]);
  
  const lastStop = lastStopRes.rows[0];

  if (!lastStop) {
    const popular = await query('SELECT * FROM cities ORDER BY popularity_score DESC LIMIT 5');
    return popular.rows.map(c => ({ ...c, reason: 'Popular starting point' }));
  }

  const routesRes = await query(`
    SELECT c.*, pr.frequency,
           'Travelers often head to ' || c.name || ' after ' || $2 AS reason
    FROM popular_routes pr
    JOIN cities c ON c.id = pr.dest_city
    WHERE pr.origin_city = $1
      AND c.id NOT IN (SELECT city_id FROM stops WHERE trip_id = $3)
    ORDER BY pr.frequency DESC
    LIMIT 5
  `, [lastStop.city_id, lastStop.name, tripId]);

  if (routesRes.rows.length > 0) return routesRes.rows;

  const fallback = await query(`
    SELECT c.*, 'Explore more of ' || $1 AS reason
    FROM cities c
    WHERE c.continent = $2
      AND c.id NOT IN (SELECT city_id FROM stops WHERE trip_id = $3)
    ORDER BY popularity_score DESC
    LIMIT 5
  `, [lastStop.continent, lastStop.continent, tripId]);

  return fallback.rows;
};

module.exports = {
  getCityRecommendations,
  getActivityRecommendations,
  getNextCityRecommendation
};
