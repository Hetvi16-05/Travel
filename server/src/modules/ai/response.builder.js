/**
 * Response Builder
 * Generates natural language responses based on AI intents and actions.
 */

const GREETINGS = [
  "Done! I've updated your trip with those changes.",
  "Got it. Here's your revised itinerary:",
  "Sure thing! I've made the updates you asked for.",
  "All set. Here's what's new in your trip:",
  "Perfect. I've adjusted your plan as requested.",
];

const SUGGESTIONS = [
  "Want me to also add some activities to these cities?",
  "Should I check if this fits your budget?",
  "Want me to suggest some popular food spots nearby?",
  "Should I add a packing list for this trip?",
  "Want me to optimize your route to save time?",
];

function buildResponse(intent, actions, scores) {
  const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
  const suggestion = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];
  let body = '';

  switch (intent) {
    case 'GENERATE_ITINERARY':
      body = "I've built a full itinerary for you! Here are the stops:\n\n";
      body += actions.map(a => `📍 **${a.city}, ${a.country}** — ${a.days} days, ${a.activities} activities`).join('\n');
      break;

    case 'ADD_STOP':
      body = actions[0]?.message || "I've added the new stop to your trip.";
      break;

    case 'REMOVE_STOP':
      body = actions[0]?.message || "I've removed that stop from your itinerary.";
      break;

    case 'SET_BUDGET':
      body = actions[0]?.message || "I've updated your trip budget.";
      break;

    case 'GET_SUGGESTIONS':
      body = "Here are some top-rated activities you might enjoy:\n\n";
      body += actions.map(a => `⭐ **${a.name}** (${a.category}) — ₹${a.price_est || 0}`).join('\n');
      break;

    case 'PACKING_TIPS':
      body = "Based on your destinations, here's what you should pack:\n\n";
      body += "• 🛂 Passport & Travel Docs\n";
      body += "• 🔌 Universal Travel Adapter\n";
      body += "• 👟 Comfortable Walking Shoes\n";
      body += "• 🧥 Lightweight layers (check weather near departure)\n";
      body += "• 🧴 Sunscreen & Basic First Aid\n";
      break;

    case 'BUDGET_CHECK':
      if (scores?.warnings?.some(w => w.type === 'budget')) {
        body = "⚠️ Your current plan is slightly over budget. " + scores.warnings.find(w => w.type === 'budget').message;
      } else {
        body = "✅ Your budget looks solid! You have enough allocated for all your planned activities and stays.";
      }
      break;

    case 'OPTIMIZE':
      body = "I've optimized your itinerary for efficiency! Check the updated route and sequence.";
      break;

    case 'UNKNOWN':
      body = "I'm not quite sure I understood that. You can ask me to:\n\n";
      body += "• \"Plan a 5-day trip to Goa\"\n";
      body += "• \"Add Mumbai for 2 days\"\n";
      body += "• \"Suggest activities in Udaipur\"\n";
      body += "• \"Is my budget realistic?\"\n";
      body += "• \"What should I pack?\"";
      return { reply: body };

    default:
      body = actions[0]?.message || "I've processed your request.";
  }

  // Append a relevant tip if available
  if (scores?.tips?.length > 0) {
    body += `\n\n💡 **Tip:** ${scores.tips[0].message}`;
  }

  return {
    reply: `${greeting}\n\n${body}\n\n${suggestion}`,
    follow_up: suggestion,
  };
}

module.exports = { buildResponse };
