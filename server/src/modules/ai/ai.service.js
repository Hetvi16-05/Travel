/**
 * AI Trip Planning Service
 * ─────────────────────────────────────────────────────────────
 * 100% self-hosted, zero external API calls.
 * Uses rule-based NLP to parse user intent, then queries
 * PostgreSQL cities + activity_catalog to build real itineraries.
 */

const db = require('../../config/db');

// ─── INTENT PARSER ────────────────────────────────────────────────────────────

/**
 * Extract structured intent from a natural language message.
 * Returns: { destination, days, budget, style, travellerType, currency, isRegenerate }
 */
function parseIntent(message, history = []) {
  const text = message.toLowerCase();

  // ── Destination ──────────────────────────────────────────────
  const knownDestinations = [
    'goa', 'udaipur', 'manali', 'jaipur', 'kerala', 'rishikesh',
    'coorg', 'spiti valley', 'spiti', 'varanasi', 'andaman', 'darjeeling', 'hampi',
    'mumbai', 'delhi', 'bangalore', 'hyderabad', 'kolkata', 'agra', 'kashmir',
    'ladakh', 'ooty', 'mysore', 'pondicherry', 'amritsar', 'jodhpur',
  ];

  const destinationAliases = {
    'spiti': 'Spiti Valley',
    'andaman': 'Andaman Islands',
    'kerala backwaters': 'Kerala',
    'pink city': 'Jaipur',
    'city of lakes': 'Udaipur',
    'yoga capital': 'Rishikesh',
  };

  let destination = null;
  for (const alias of Object.keys(destinationAliases)) {
    if (text.includes(alias)) {
      destination = destinationAliases[alias];
      break;
    }
  }
  if (!destination) {
    for (const dest of knownDestinations) {
      if (text.includes(dest)) {
        destination = dest.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        break;
      }
    }
  }

  // Fall back: check conversation history for destination
  if (!destination && history.length > 0) {
    for (let i = history.length - 1; i >= 0; i--) {
      const prevText = (history[i].content || '').toLowerCase();
      for (const dest of knownDestinations) {
        if (prevText.includes(dest)) {
          destination = dest.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          break;
        }
      }
      if (destination) break;
    }
  }

  // ── Duration ──────────────────────────────────────────────────
  let days = 3; // default
  const daysMatch = text.match(/(\d+)\s*(?:day|days|night|nights)/);
  if (daysMatch) {
    days = Math.min(Math.max(parseInt(daysMatch[1]), 1), 14);
  } else if (text.includes('week')) {
    days = 7;
  } else if (text.includes('weekend')) {
    days = 2;
  } else if (text.includes('fortnight')) {
    days = 14;
  }

  // ── Budget ────────────────────────────────────────────────────
  let budget = null;
  let currency = 'INR';

  const budgetMatch = text.match(/(?:₹|rs\.?|inr|under|within|budget of|upto?)\s*([0-9,]+(?:k|000)?)/i);
  if (budgetMatch) {
    let raw = budgetMatch[1].replace(/,/g, '');
    if (raw.endsWith('k')) raw = parseFloat(raw) * 1000;
    budget = parseInt(raw);
  }

  // ── Travel Style ──────────────────────────────────────────────
  let style = 'moderate';
  if (text.match(/\b(backpack|budget|cheap|low.?cost|shoestring)\b/)) style = 'budget';
  else if (text.match(/\b(luxury|lavish|premium|5.?star|five.?star|splurge)\b/)) style = 'luxury';
  else if (text.match(/\b(moderate|mid.?range|comfortable|decent)\b/)) style = 'moderate';
  else if (budget !== null) {
    if (budget < 8000) style = 'budget';
    else if (budget > 40000) style = 'luxury';
  }

  // ── Traveller Type ────────────────────────────────────────────
  let travellerType = 'solo';
  if (text.match(/\b(couple|partner|honeymoon|romantic|anniversary)\b/)) travellerType = 'couple';
  else if (text.match(/\b(family|kids?|children|parents?)\b/)) travellerType = 'family';
  else if (text.match(/\b(friends?|group|squad|gang|crew)\b/)) travellerType = 'friends';
  else if (text.match(/\b(solo|alone|myself|by myself)\b/)) travellerType = 'solo';

  // ── Activity Preferences ──────────────────────────────────────
  const preferences = [];
  if (text.match(/\b(adventure|trek|hike|rafting|bungee|sport)\b/)) preferences.push('Adventure');
  if (text.match(/\b(culture|heritage|temple|museum|history|fort)\b/)) preferences.push('Culture');
  if (text.match(/\b(food|eat|cuisine|restaurant|street food)\b/)) preferences.push('Food');
  if (text.match(/\b(nature|wildlife|forest|waterfall|garden)\b/)) preferences.push('Nature');
  if (text.match(/\b(relax|spa|peaceful|calm|wellness|beach)\b/)) preferences.push('Relaxation');
  if (text.match(/\b(beach|sea|ocean|shore|coastal)\b/)) preferences.push('Beach');

  // ── Regeneration flag ─────────────────────────────────────────
  const isRegenerate = !!(text.match(/\b(regenerate|redo|again|different|another|change)\b/) && history.length > 0);

  return { destination, days, budget, style, currency, travellerType, preferences, isRegenerate };
}

// ─── DATABASE QUERIES ─────────────────────────────────────────────────────────

async function fetchCity(destinationName) {
  const result = await db.query(
    `SELECT * FROM cities WHERE LOWER(name) ILIKE $1 AND is_active = TRUE LIMIT 1`,
    [`%${destinationName.toLowerCase()}%`]
  );
  return result.rows[0] || null;
}

async function fetchActivities(cityId, preferences = [], style, days) {
  // We want at least 3 activities per day
  const limit = Math.max(days * 4, 12);

  let orderClause = 'RANDOM()';
  if (style === 'budget') orderClause = 'price_est ASC, RANDOM()';
  if (style === 'luxury') orderClause = 'price_est DESC, RANDOM()';

  let categoryFilter = '';
  const params = [cityId, limit];

  if (preferences.length > 0) {
    const placeholders = preferences.map((_, i) => `$${i + 3}`).join(', ');
    categoryFilter = `AND (category IN (${placeholders}) OR RANDOM() > 0.4)`;
    params.push(...preferences);
  }

  const result = await db.query(
    `SELECT * FROM activity_catalog 
     WHERE city_id = $1 ${categoryFilter}
     ORDER BY ${orderClause}
     LIMIT $2`,
    params
  );
  return result.rows;
}

// ─── ITINERARY BUILDER ────────────────────────────────────────────────────────

const TIME_SLOTS = ['Morning', 'Afternoon', 'Evening'];

function buildItinerary(city, activities, days, style, travellerType) {
  const itineraryDays = [];
  let activityPool = [...activities];

  // Shuffle with style bias
  if (style === 'budget') {
    activityPool.sort((a, b) => (a.price_est || 0) - (b.price_est || 0));
  } else if (style === 'luxury') {
    activityPool.sort((a, b) => (b.price_est || 0) - (a.price_est || 0));
  }

  // First day: always start with something iconic + check-in
  const checkInActivity = {
    time: 'Morning',
    title: `Arrival & Check-in to ${city.name}`,
    description: `Arrive at ${city.name}, check in to your ${style === 'luxury' ? 'premium hotel' : style === 'budget' ? 'hostel or guesthouse' : 'comfortable stay'}. Freshen up and explore the neighbourhood.`,
    price_est: 0,
    isArrival: true,
  };

  for (let d = 0; d < days; d++) {
    const dayActivities = [];

    if (d === 0) {
      dayActivities.push(checkInActivity);
      // Add 2 light activities for day 1
      const picked = pickActivitiesForDay(activityPool, 2, travellerType);
      activityPool = activityPool.filter(a => !picked.includes(a));
      dayActivities.push(
        ...picked.map((act, i) => ({ ...act, time: TIME_SLOTS[i + 1] }))
      );
    } else if (d === days - 1) {
      // Last day: morning activity + checkout
      const picked = pickActivitiesForDay(activityPool, 1, travellerType);
      activityPool = activityPool.filter(a => !picked.includes(a));
      dayActivities.push(
        ...picked.map(act => ({ ...act, time: 'Morning' })),
        {
          time: 'Afternoon',
          title: `Departure from ${city.name}`,
          description: `Check out and head to the airport/station. Carry warm memories and local souvenirs!`,
          price_est: 0,
          isDeparture: true,
        }
      );
    } else {
      // Middle days: 3 full activities
      const picked = pickActivitiesForDay(activityPool, 3, travellerType);
      activityPool = activityPool.filter(a => !picked.includes(a));
      dayActivities.push(
        ...picked.map((act, i) => ({ ...act, time: TIME_SLOTS[i] }))
      );
    }

    itineraryDays.push({
      day: d + 1,
      activities: dayActivities.map(act => ({
        time: act.time,
        title: act.title || act.name,
        description: act.description,
        price_est: act.price_est || 0,
        category: act.category || null,
      })),
    });
  }

  return {
    title: `${city.name} ${travellerType === 'couple' ? 'Romantic ' : travellerType === 'family' ? 'Family ' : ''}Getaway`,
    cityName: city.name,
    cityImage: city.image_url || null,
    duration: `${days} Day${days > 1 ? 's' : ''}`,
    style,
    travellerType,
    days: itineraryDays,
  };
}

function pickActivitiesForDay(pool, count, travellerType) {
  // For families: prefer lower-intensity activities
  // For adventure: prefer Adventure category
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ─── BUDGET ESTIMATOR ─────────────────────────────────────────────────────────

const BUDGET_RATES = {
  budget: {
    transport: { base: 1200, perDay: 200 },
    accommodation: { perNight: 600 },
    food: { perDay: 400 },
    misc: { base: 500, perDay: 100 },
  },
  moderate: {
    transport: { base: 3000, perDay: 400 },
    accommodation: { perNight: 1800 },
    food: { perDay: 900 },
    misc: { base: 1000, perDay: 200 },
  },
  luxury: {
    transport: { base: 8000, perDay: 1000 },
    accommodation: { perNight: 6000 },
    food: { perDay: 2500 },
    misc: { base: 3000, perDay: 600 },
  },
};

const TRAVELLER_MULTIPLIERS = {
  solo: 1,
  couple: 1.7,
  family: 2.5,
  friends: 2.2,
};

function estimateBudget(days, style, travellerType, activities, userBudget) {
  const rates = BUDGET_RATES[style] || BUDGET_RATES.moderate;
  const multiplier = TRAVELLER_MULTIPLIERS[travellerType] || 1;

  const transport = Math.round((rates.transport.base + rates.transport.perDay * days) * multiplier);
  const accommodation = Math.round(rates.accommodation.perNight * (days - 1) * multiplier);
  const food = Math.round(rates.food.perDay * days * multiplier);
  const activityCost = Math.round(
    activities
      .filter(a => a.price_est && !a.isArrival && !a.isDeparture)
      .reduce((sum, a) => sum + (a.price_est || 0), 0) * multiplier
  );
  const misc = Math.round((rates.misc.base + rates.misc.perDay * days) * multiplier);

  const total = transport + accommodation + food + activityCost + misc;

  // If user gave a budget, proportionally scale down if over
  const scaleFactor = (userBudget && total > userBudget) ? (userBudget / total) : 1;
  const scale = (n) => Math.round(n * scaleFactor);

  return {
    total: scale(total),
    currency: '₹',
    breakdown: [
      {
        category: 'Transport',
        amount: scale(transport),
        percentage: Math.round((transport / total) * 100),
        color: 'text-blue-400 bg-blue-400/20',
      },
      {
        category: 'Accommodation',
        amount: scale(accommodation),
        percentage: Math.round((accommodation / total) * 100),
        color: 'text-violet-400 bg-violet-400/20',
      },
      {
        category: 'Food & Drinks',
        amount: scale(food),
        percentage: Math.round((food / total) * 100),
        color: 'text-orange-400 bg-orange-400/20',
      },
      {
        category: 'Activities',
        amount: scale(activityCost),
        percentage: Math.round((activityCost / total) * 100),
        color: 'text-emerald-400 bg-emerald-400/20',
      },
      {
        category: 'Miscellaneous',
        amount: scale(misc),
        percentage: Math.round((misc / total) * 100),
        color: 'text-rose-400 bg-rose-400/20',
      },
    ],
    note: userBudget && total > userBudget
      ? `Costs scaled to fit your ₹${userBudget.toLocaleString('en-IN')} budget`
      : null,
  };
}

// ─── RESPONSE TEXT GENERATOR ──────────────────────────────────────────────────

const OPENING_TEMPLATES = {
  budget: [
    "Here's a wallet-friendly {days}-day itinerary for {city} — packed with experiences without breaking the bank! 🎒",
    "Great choice! I've crafted a thrifty {days}-day {city} plan. Every rupee counts — here's how to make the most of it:",
  ],
  moderate: [
    "Perfect! I've put together a balanced {days}-day itinerary for {city} — comfort meets adventure. Here's your plan:",
    "Here's a thoughtfully planned {days}-day {city} trip — the right mix of must-sees, local food, and downtime:",
  ],
  luxury: [
    "Indulge yourself! Here's a premium {days}-day {city} experience — the finest stays, exclusive experiences, and gourmet dining:",
    "You deserve the best! I've designed an unforgettable {days}-day luxury journey through {city}:",
  ],
};

const TRAVELLER_SUFFIX = {
  solo: '',
  couple: ' — crafted especially for two. 💑',
  family: ' — family-friendly with options for all ages. 👨‍👩‍👧‍👦',
  friends: ' — because the best memories are made with great company. 🎉',
};

function generateResponseText(intent, city) {
  const templates = OPENING_TEMPLATES[intent.style] || OPENING_TEMPLATES.moderate;
  const template = templates[Math.floor(Math.random() * templates.length)];
  const suffix = TRAVELLER_SUFFIX[intent.travellerType] || '';

  const text = template
    .replace('{days}', intent.days)
    .replace('{city}', city.name);

  return text + suffix;
}

function generateClarificationText(message) {
  const text = message.toLowerCase();

  if (!text.match(/\b(goa|udaipur|manali|jaipur|kerala|rishikesh|coorg|spiti|varanasi|andaman|darjeeling|hampi|mumbai|delhi|bangalore|kashmir|ladakh)\b/)) {
    return "I'd love to plan a trip for you! 🗺️ Could you tell me which destination you have in mind? For example: *\"Plan a 5-day trip to Goa under ₹15,000\"*";
  }

  return "Could you give me a bit more detail? For example: **destination**, **number of days**, and **budget**. I'll craft the perfect itinerary for you!";
}

// ─── MAIN PLAN FUNCTION ───────────────────────────────────────────────────────

async function generatePlan(message, history = []) {
  const intent = parseIntent(message, history);

  // No destination found — ask for clarification
  if (!intent.destination) {
    return {
      type: 'clarification',
      text: generateClarificationText(message),
      intent,
    };
  }

  // Fetch city from DB
  const city = await fetchCity(intent.destination);

  if (!city) {
    return {
      type: 'unknown_destination',
      text: `I don't have detailed data for **${intent.destination}** yet, but I'm learning fast! 🌍 Try destinations like Goa, Udaipur, Manali, Jaipur, Kerala, Rishikesh, Spiti Valley, or Varanasi — I have rich plans for those!`,
      intent,
    };
  }

  // Fetch activities
  const activities = await fetchActivities(city.id, intent.preferences, intent.style, intent.days);

  if (!activities.length) {
    return {
      type: 'no_activities',
      text: `I found ${city.name} but I'm still building the activity database for it. Try asking about Goa, Udaipur, Manali, or Jaipur for now!`,
      intent,
    };
  }

  // Build the itinerary
  const itinerary = buildItinerary(city, activities, intent.days, intent.style, intent.travellerType);

  // Estimate budget
  const allActivitiesFlat = itinerary.days.flatMap(d => d.activities);
  const budget = estimateBudget(intent.days, intent.style, intent.travellerType, allActivitiesFlat, intent.budget);

  // Generate response text
  const responseText = generateResponseText(intent, city);

  return {
    type: 'plan',
    text: responseText,
    intent,
    itinerary,
    budget,
    city: {
      name: city.name,
      country: city.country,
      description: city.description,
      image_url: city.image_url,
    },
  };
}

module.exports = { generatePlan, parseIntent };
