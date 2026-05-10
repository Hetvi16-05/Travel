const { query } = require('../../config/db');
const { parseIntent } = require('./intent.parser');
const { generateItinerary } = require('./trip.generator');
const { scoreTripAndGetTips } = require('./score.engine');
const { buildResponse } = require('./response.builder');
const ApiError = require('../../utils/ApiError');

/**
 * AI Service Orchestrator
 * Routes user messages to specialized engines and persists changes.
 */

// Legacy support for standalone AiPlanner page
const generatePlan = async (message, history = []) => {
  const { intent, params } = parseIntent(message);
  
  if (intent === 'GENERATE_ITINERARY' || intent === 'UNKNOWN') {
    const region = params.region || 'Goa';
    const days = params.days || 3;
    const style = params.style || 'moderate';

    // 1. Find the best matching city
    const cityRes = await query(`
      SELECT * FROM cities 
      WHERE LOWER(name) ILIKE $1 OR LOWER(continent) = LOWER($2) OR LOWER(country) = LOWER($2)
      ORDER BY popularity_score DESC
      LIMIT 1
    `, [`%${region}%`, region]);
    
    const city = cityRes.rows[0];
    if (!city) {
      return { 
        type: 'clarification', 
        text: "I couldn't find that destination in my database yet. How about somewhere like Goa, Paris, or Tokyo?" 
      };
    }

    // 2. Fetch activities for the city
    const activitiesRes = await query(`
      SELECT name as title, description, category as type, price_est
      FROM activity_catalog 
      WHERE city_id = $1
      ORDER BY RANDOM()
      LIMIT $2
    `, [city.id, days * 3]);

    const allActivities = activitiesRes.rows;
    const itinerary = {
      cityName: city.name,
      days: []
    };

    // 3. Build days with a cycling algorithm (Tour Guide Logic)
    for (let d = 1; d <= days; d++) {
      const dayActivities = [];
      const poolSize = allActivities.length;

      if (poolSize > 0) {
        // Use a daily offset to ensure variety, even if we have to repeat later
        const dayOffset = (d - 1) * 3;
        for (let i = 0; i < 3; i++) {
          const act = allActivities[(dayOffset + i) % poolSize];
          dayActivities.push({
            ...act,
            time: i === 0 ? 'Morning' : i === 1 ? 'Afternoon' : 'Evening'
          });
        }
      } else {
        dayActivities.push({ 
          title: 'Discover local secrets', 
          description: 'A professional guide takes you through the hidden alleys and local stories of ' + city.name, 
          type: 'Culture', 
          time: 'Morning', 
          cost: 0 
        });
        dayActivities.push({ 
          title: 'Culinary Heritage Walk', 
          description: 'Taste the authentic flavors that define ' + city.name + ' for the locals.', 
          type: 'Dining', 
          time: 'Afternoon', 
          cost: 20 
        });
      }
      
      itinerary.days.push({
        day: d,
        activities: dayActivities
      });
    }

    // 4. Calculate budget
    const dailyCost = city.avg_daily_cost || 100;
    const multiplier = style === 'budget' ? 0.6 : style === 'luxury' ? 2.5 : 1.0;
    const totalBase = dailyCost * days * multiplier;
    
    const budget = {
      total: totalBase + (days * 50), // base + buffer
      breakdown: [
        { category: 'Accommodation', amount: totalBase * 0.4, icon: 'Bed' },
        { category: 'Activities', amount: totalBase * 0.3, icon: 'Ticket' },
        { category: 'Food & Dining', amount: totalBase * 0.2, icon: 'Utensils' },
        { category: 'Transport', amount: totalBase * 0.1, icon: 'Car' }
      ]
    };

    return {
      type: 'plan',
      text: `I've crafted a perfect ${days}-day ${style} trip to ${city.name} for you!`,
      itinerary: {
        title: `${days}-Day ${city.name} ${style.charAt(0).toUpperCase() + style.slice(1)} Trip`,
        cityName: city.name,
        duration: `${days} Days`,
        style: style,
        travellerType: 'Solo/Group',
        days: itinerary.days,
        cityImage: city.image_url
      },
      budget,
      intent: { destination: city.name, days, style }
    };
  }

  return { 
    type: 'text', 
    text: "I'm your travel assistant! Ask me to plan a trip to a destination, and I'll build you a full itinerary and budget instantly." 
  };
};

/**
 * Chat with AI about a specific trip
 */
const chat = async (tripId, userId, message) => {
  // 1. Verify trip ownership
  const tripRes = await query('SELECT * FROM trips WHERE id = $1 AND user_id = $2', [tripId, userId]);
  if (!tripRes.rows[0]) throw ApiError.notFound('Trip not found');
  const trip = tripRes.rows[0];

  // 2. Parse intent
  const { intent, params } = parseIntent(message);
  let actions = [];

  // 3. Execute Actions
  switch (intent) {
    case 'GENERATE_ITINERARY': {
      // Clear existing stops and rebuild
      await query('DELETE FROM stops WHERE trip_id = $1', [tripId]);
      actions = await generateItinerary(tripId, userId, {
        ...params,
        startDate: trip.start_date || new Date().toISOString().split('T')[0]
      });
      break;
    }

    case 'ADD_STOP': {
      if (!params.city) break;
      const cityRes = await query('SELECT id, name, country FROM cities WHERE LOWER(name) ILIKE $1 LIMIT 1', [`%${params.city.toLowerCase()}%`]);
      const city = cityRes.rows[0];
      if (!city) {
        actions.push({ message: `I couldn't find ${params.city} in my database.` });
        break;
      }
      
      const maxOrderRes = await query('SELECT COALESCE(MAX(order_index), -1) as max_order FROM stops WHERE trip_id = $1', [tripId]);
      const nextOrder = maxOrderRes.rows[0].max_order + 1;
      
      await query(`
        INSERT INTO stops (trip_id, city_id, day_number, order_index)
        VALUES ($1, $2, $3, $4)
      `, [tripId, city.id, nextOrder + 1, nextOrder]);
      
      actions.push({ message: `Added ${city.name}, ${city.country} to your trip.` });
      break;
    }

    case 'REMOVE_STOP': {
      if (!params.city) break;
      const delRes = await query(`
        DELETE FROM stops 
        WHERE trip_id = $1 AND city_id IN (SELECT id FROM cities WHERE LOWER(name) ILIKE $2)
        RETURNING id
      `, [tripId, `%${params.city.toLowerCase()}%`]);
      
      actions.push({ message: delRes.rows.length > 0 ? `Removed ${params.city} from your trip.` : `I couldn't find ${params.city} in your itinerary.` });
      break;
    }

    case 'SET_BUDGET': {
      if (params.amount) {
        await query('UPDATE trips SET budget = $1 WHERE id = $2', [params.amount, tripId]);
        actions.push({ message: `Budget updated to ₹${params.amount.toLocaleString('en-IN')}.` });
      }
      break;
    }

    case 'GET_SUGGESTIONS': {
      const stopRes = await query(`
        SELECT id FROM stops WHERE trip_id = $1 
        ${params.city ? 'AND city_id IN (SELECT id FROM cities WHERE LOWER(name) ILIKE $2)' : 'ORDER BY order_index LIMIT 1'}
      `, [tripId, `%${params.city?.toLowerCase()}%`]);
      
      const stopId = stopRes.rows[0]?.id;
      if (stopId) {
        const activitiesRes = await query(`
          SELECT ac.name, ac.category, ac.price_est
          FROM activity_catalog ac
          JOIN stops s ON s.city_id = ac.city_id
          WHERE s.id = $1
          ORDER BY RANDOM() LIMIT 5
        `, [stopId]);
        actions = activitiesRes.rows;
      }
      break;
    }

    // ... other intents (OPTIMIZE, PACKING_TIPS, etc.)
  }

  // 4. Recalculate Scores
  const scores = await scoreTripAndGetTips(tripId);

  // 5. Build Response
  const response = buildResponse(intent, actions, scores);

  // 6. Save to history
  const historyMsg = [
    { role: 'user', content: message, timestamp: new Date() },
    { role: 'ai', content: response.reply, timestamp: new Date() }
  ];
  
  await query(`
    INSERT INTO planner_sessions (trip_id, user_id, messages)
    VALUES ($1, $2, $3)
    ON CONFLICT (trip_id, user_id) DO UPDATE SET 
      messages = planner_sessions.messages || $3::jsonb,
      updated_at = NOW()
  `, [tripId, userId, JSON.stringify(historyMsg)]);

  return {
    ...response,
    intent,
    scores: scores?.scores,
    warnings: scores?.warnings,
    tips: scores?.tips
  };
};

const getHistory = async (tripId, userId) => {
  const res = await query('SELECT messages FROM planner_sessions WHERE trip_id = $1 AND user_id = $2', [tripId, userId]);
  return res.rows[0]?.messages || [];
};

const clearHistory = async (tripId, userId) => {
  await query('DELETE FROM planner_sessions WHERE trip_id = $1 AND user_id = $2', [tripId, userId]);
};

module.exports = {
  generatePlan,
  chat,
  getHistory,
  clearHistory
};
