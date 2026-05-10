/**
 * Response Builder
 * Generates natural language responses based on AI intents and actions.
 */

const GREETINGS = [
  "Hey! I've just polished your itinerary with those updates. Take a look!",
  "Got it! I've tweaked the plan. How does it look to you now?",
  "Sure thing! I've made those changes for you. 🗺️",
  "All set! Your trip is looking better than ever with these new details.",
  "Perfect. I've adjusted your plan. I think you're going to love these changes!",
  "I'm on it! Here's your revised travel plan. ✈️",
];

const SUGGESTIONS = [
  "Want me to look for some cool local spots or hidden gems in these cities?",
  "Should we double-check if this fits your budget comfortably?",
  "I know some great food spots nearby—want my top picks?",
  "Should I help you put together a quick packing list so you don't forget anything?",
  "I can optimize the route to save you some travel time. Interested?",
  "Need help finding a place to stay that matches this vibe?",
];

function buildResponse(intent, actions, scores, userName) {
  const namePrefix = userName ? `Hey ${userName}! ` : "";
  const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
  const suggestion = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];
  let body = '';

  switch (intent) {
    case 'GENERATE_ITINERARY':
      body = "I've crafted a full adventure for you! Here's the roadmap for your journey:\n\n";
      body += actions.map(a => `📍 **${a.city}, ${a.country}** — ${a.days} days of exploring ${a.activities} top activities`).join('\n');
      break;

    case 'ADD_STOP':
      body = actions[0]?.message || "I've added that new stop to your journey. It's going to be a great addition!";
      break;

    case 'REMOVE_STOP':
      body = actions[0]?.message || "No problem, I've cleared that stop from your itinerary to keep things simple.";
      break;

    case 'SET_BUDGET':
      body = actions[0]?.message || "Budget updated! I'll keep an eye on things to make sure we stay on track.";
      break;

    case 'GET_SUGGESTIONS':
      body = "I've picked out some local favorites I think you'll really enjoy:\n\n";
      body += actions.map(a => `✨ **${a.name}** — A must-visit ${a.category} experience (est. ₹${a.price_est || 0})`).join('\n');
      break;

    case 'PACKING_TIPS':
      body = "Since you're heading to these spots, I've put together a survival kit for you:\n\n";
      body += "• 🛂 **Docs**: Don't forget that passport and insurance!\n";
      body += "• 🔌 **Gear**: A universal adapter is a lifesaver.\n";
      body += "• 👟 **Shoes**: Trust me, you'll want your most comfortable walking shoes.\n";
      body += "• 🧥 **Layers**: Weather can be unpredictable, so pack light layers.\n";
      body += "• 🧴 **Essentials**: Sunscreen and a small first-aid kit go a long way.\n";
      break;

    case 'BUDGET_CHECK':
      if (scores?.warnings?.some(w => w.type === 'budget')) {
        body = "⚠️ Just a heads-up: we're pushing the budget a bit here. " + scores.warnings.find(w => w.type === 'budget').message;
      } else {
        body = "✅ Good news! Your budget looks perfect. You've got plenty of room for all these experiences.";
      }
      break;

    case 'OPTIMIZE':
      body = "I've rearranged things to make your route as smooth as possible. More time exploring, less time traveling!";
      break;

    case 'UNKNOWN':
      body = "I'm not quite sure I caught that. But I'd love to help! Try asking me something like:\n\n";
      body += "• \"Plan a 5-day dream trip to Goa\"\n";
      body += "• \"Add Mumbai to my trip for 2 days\"\n";
      body += "• \"What are some cool things to do in Udaipur?\"\n";
      body += "• \"Is my budget looking realistic?\"\n";
      body += "• \"Help me with a packing list!\"";
      return { reply: body };

    default:
      body = actions[0]?.message || "I've taken care of that for you!";
  }

  // Append a relevant tip if available
  if (scores?.tips?.length > 0) {
    body += `\n\n💡 **Local Tip:** ${scores.tips[0].message}`;
  }

  return {
    reply: `${namePrefix}${greeting}\n\n${body}\n\n${suggestion}`,
    follow_up: suggestion,
  };
}

module.exports = { buildResponse };
