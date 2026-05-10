const { query } = require('../../config/db');

/**
 * Score Engine
 * Analyzes trip data to calculate quality scores and generate actionable tips.
 */

async function scoreTripAndGetTips(tripId) {
  // Fetch trip with stops and budget
  const tripRes = await query(`
    SELECT t.*, 
      (SELECT SUM(amount) FROM budget_items WHERE trip_id = t.id) as total_spent,
      (SELECT COUNT(*) FROM stops WHERE trip_id = t.id) as stop_count
    FROM trips t WHERE t.id = $1
  `, [tripId]);
  
  const trip = tripRes.rows[0];
  if (!trip) return null;

  const stopsRes = await query(`
    SELECT s.*, c.name as city_name, c.avg_daily_cost,
      (SELECT COUNT(*) FROM stop_activities WHERE stop_id = s.id) as activity_count
    FROM stops s
    LEFT JOIN cities c ON c.id = s.city_id
    WHERE s.trip_id = $1
    ORDER BY s.day_number
  `, [tripId]);

  const stops = stopsRes.rows;
  const warnings = [];
  const tips = [];

  // 1. Pace Score
  let paceScore = 10;
  stops.forEach(s => {
    // We don't have actual departure dates yet in the simplified schema, 
    // but we can check activity count vs stop duration (if we had it)
    // For now, let's check if stops have enough activities
    if (s.activity_count < 2) {
      paceScore -= 1;
      tips.push({ type: 'pace', message: `Consider adding more activities to ${s.city_name} to make the most of your stay.` });
    }
  });
  paceScore = Math.max(0, paceScore);

  // 2. Budget Score
  let budgetScore = 10;
  const plannedBudget = parseFloat(trip.budget || 0);
  const totalSpent = parseFloat(trip.total_spent || 0);

  if (plannedBudget > 0) {
    if (totalSpent > plannedBudget) {
      budgetScore = Math.max(0, 10 - ((totalSpent - plannedBudget) / plannedBudget) * 10);
      warnings.push({ type: 'budget', message: `You are ₹${Math.round(totalSpent - plannedBudget)} over your planned budget.` });
    } else if (totalSpent < plannedBudget * 0.5) {
      tips.push({ type: 'budget', message: `You have plenty of budget left! Consider upgrading your accommodation or adding premium experiences.` });
    }
  }

  // 3. Variety Score
  let varietyScore = 5;
  const activityCategoriesRes = await query(`
    SELECT DISTINCT ac.category
    FROM stop_activities sa
    JOIN activity_catalog ac ON ac.id = sa.activity_id
    JOIN stops s ON s.id = sa.stop_id
    WHERE s.trip_id = $1
  `, [tripId]);
  
  const categoryCount = activityCategoriesRes.rows.length;
  varietyScore = Math.min(10, categoryCount * 2);
  if (categoryCount < 3) {
    tips.push({ type: 'variety', message: "Try mixing in some different types of activities (e.g., Food, Adventure, Culture) for a more well-rounded trip." });
  }

  const overallScore = ((paceScore * 0.3) + (budgetScore * 0.4) + (varietyScore * 0.3)).toFixed(1);

  // Persist scores
  await query(`
    INSERT INTO trip_scores (trip_id, budget_score, variety_score, pace_score, overall_score, warnings, tips)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (trip_id) DO UPDATE SET
      budget_score = $2,
      variety_score = $3,
      pace_score = $4,
      overall_score = $5,
      warnings = $6,
      tips = $7,
      updated_at = NOW()
  `, [
    tripId, 
    budgetScore, 
    varietyScore, 
    paceScore, 
    overallScore, 
    JSON.stringify(warnings), 
    JSON.stringify(tips)
  ]);

  return {
    scores: { budgetScore, varietyScore, paceScore, overallScore },
    warnings,
    tips
  };
}

module.exports = { scoreTripAndGetTips };
