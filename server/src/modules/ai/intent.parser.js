/**
 * Intent Parser
 * Parses free-text input into structured intents using pattern matching.
 * 100% self-hosted, no external libraries.
 */

const INTENT_PATTERNS = [
  // --- GENERATE FULL ITINERARY ---
  {
    intent: 'GENERATE_ITINERARY',
    patterns: [
      /plan\s+(me\s+)?a?\s*(\d+)[- ]day/i,
      /create\s+(a\s+)?itinerary/i,
      /build\s+(me\s+)?a\s+trip/i,
      /generate\s+(a\s+)?trip/i,
      /suggest\s+(a\s+)?trip/i,
      /i want to (go|travel|visit)/i,
    ],
    extract: (text) => {
      const days = text.match(/(\d+)[- ]day/i)?.[1];
      const budget = text.match(/(?:₹|rs\.?|inr|\$)\s*([0-9,]+(?:k|000)?)/i)?.[1]?.replace(',', '');
      let parsedBudget = budget;
      if (budget && budget.toLowerCase().endsWith('k')) parsedBudget = parseFloat(budget) * 1000;
      
      const region = extractRegion(text);
      const style = extractStyle(text);
      return { 
        days: days ? parseInt(days) : 3, 
        budget: parsedBudget ? parseFloat(parsedBudget) : null, 
        region, 
        style 
      };
    },
  },

  // --- ADD STOP ---
  {
    intent: 'ADD_STOP',
    patterns: [
      /add\s+(?:a\s+)?(\d+)?\s*days?\s+stop\s+(?:in|at)?\s*([a-z\s]+)/i,
      /add\s+(?:a\s+stop\s+(?:in|at|for)\s+)?([a-z\s]+?)(?:\s+for\s+(\d+)\s+days?)?(?:\s+|$)/i,
      /include\s+([a-z\s]+?)\s+in\s+(?:the\s+)?(?:trip|itinerary)/i,
      /i\s+want\s+to\s+(?:go\s+to|visit)\s+([a-z\s]+)/i,
      /(\d+)\s+days?\s+in\s+([a-z\s]+)/i,
    ],
    extract: (text) => {
      const complexMatch = text.match(/add\s+(?:a\s+)?(\d+)?\s*days?\s+stop\s+(?:in|at)?\s*([a-z\s]+)/i);
      if (complexMatch) {
        return {
          days: complexMatch[1] ? parseInt(complexMatch[1]) : 3,
          city: complexMatch[2].trim()
        };
      }

      const cityMatch =
        text.match(/add\s+(?:a\s+stop\s+in\s+)?([A-Za-z\s]+?)(?:\s+for|\s+to|\s*$)/i) ||
        text.match(/visit\s+([A-Za-z\s]+?)(?:\s+for|\s*$)/i) ||
        text.match(/days?\s+in\s+([A-Za-z\s]+)/i);
      const daysMatch = text.match(/(\d+)\s+days?/i);
      return {
        city: cityMatch?.[1]?.trim(),
        days: daysMatch ? parseInt(daysMatch[1]) : 3,
      };
    },
  },

  // --- REMOVE STOP ---
  {
    intent: 'REMOVE_STOP',
    patterns: [
      /remove\s+([a-z\s]+?)(?:\s+from|\s*$)/i,
      /delete\s+([a-z\s]+?)\s+(?:stop|from)/i,
      /skip\s+([a-z\s]+)/i,
      /drop\s+([a-z\s]+)/i,
      /take\s+out\s+([a-z\s]+)/i,
    ],
    extract: (text) => {
      const match = text.match(/(?:remove|delete|skip|drop|take\s+out)\s+([A-Za-z\s]+?)(?:\s+from|stop|\s*$)/i);
      return { city: match?.[1]?.trim() };
    },
  },

  // --- REORDER ---
  {
    intent: 'REORDER',
    patterns: [
      /move\s+([a-z\s]+?)\s+to\s+(the\s+)?(first|last|beginning|end|\d+(?:st|nd|rd|th)?\s+stop)/i,
      /put\s+([a-z\s]+?)\s+(first|last|before|after)/i,
      /([a-z\s]+?)\s+should\s+(come\s+)?(first|last|before|after)/i,
      /swap\s+([a-z\s]+?)\s+(?:and|with)\s+([a-z\s]+)/i,
      /start\s+(?:with|in)\s+([a-z\s]+)/i,
      /end\s+(?:with|in)\s+([a-z\s]+)/i,
    ],
    extract: (text) => {
      const moveMatch = text.match(/move\s+([A-Za-z\s]+?)\s+to\s+(?:the\s+)?(first|last|beginning|end)/i);
      const swapMatch = text.match(/swap\s+([A-Za-z\s]+?)\s+(?:and|with)\s+([A-Za-z\s]+)/i);
      const startMatch = text.match(/start\s+(?:with|in)\s+([A-Za-z\s]+)/i);
      const endMatch = text.match(/end\s+(?:with|in)\s+([A-Za-z\s]+)/i);
      if (moveMatch) return { city: moveMatch[1].trim(), position: moveMatch[2] };
      if (swapMatch) return { city_a: swapMatch[1].trim(), city_b: swapMatch[2].trim() };
      if (startMatch) return { city: startMatch[1].trim(), position: 'first' };
      if (endMatch) return { city: endMatch[1].trim(), position: 'last' };
      return {};
    },
  },

  // --- ADD ACTIVITY ---
  {
    intent: 'ADD_ACTIVITY',
    patterns: [
      /add\s+(?:a\s+)?(.+?)\s+(?:in|at|to)\s+([a-z\s]+)/i,
      /(?:include|add)\s+(.+?)\s+(?:activity|experience|tour)/i,
      /i\s+want\s+to\s+(?:do|try|see|eat|visit)\s+(.+?)(?:\s+in\s+([a-z\s]+))?/i,
    ],
    extract: (text) => {
      const match = text.match(/(?:add|include)\s+(.+?)\s+(?:in|at|to)\s+([A-Za-z\s]+)/i);
      return {
        activity: match?.[1]?.trim(),
        city: match?.[2]?.trim(),
      };
    },
  },

  // --- SET BUDGET ---
  {
    intent: 'SET_BUDGET',
    patterns: [
      /(?:my\s+)?budget\s+(?:is\s+)?(?:₹|rs\.?|inr|\$)\s*([0-9,]+(?:k|000)?)/i,
      /i\s+have\s+(?:₹|rs\.?|inr|\$)\s*([0-9,]+(?:k|000)?)\s+(?:to\s+spend|budget|total)/i,
      /(?:set|change|update)\s+(?:the\s+)?budget\s+to\s+(?:₹|rs\.?|inr|\$)\s*([0-9,]+(?:k|000)?)/i,
      /(?:keep\s+it\s+)?under\s+(?:₹|rs\.?|inr|\$)\s*([0-9,]+(?:k|000)?)/i,
    ],
    extract: (text) => {
      const match = text.match(/(?:₹|rs\.?|inr|\$)\s*([0-9,]+(?:k|000)?)/i);
      if (match) {
        let raw = match[1].replace(',', '');
        if (raw.toLowerCase().endsWith('k')) raw = parseFloat(raw) * 1000;
        return { amount: parseFloat(raw) };
      }
      return { amount: null };
    },
  },

  // --- OPTIMIZE ---
  {
    intent: 'OPTIMIZE',
    patterns: [
      /optimize\s+(?:my\s+)?(?:trip|route|itinerary|budget)/i,
      /make\s+(?:it\s+)?(?:cheaper|better|efficient|shorter)/i,
      /save\s+(?:me\s+)?money/i,
      /reduce\s+(?:the\s+)?cost/i,
      /best\s+(?:route|order|sequence)/i,
    ],
    extract: (text) => {
      const isBudget = /budget|cheap|money|cost|save/i.test(text);
      const isRoute = /route|order|sequence|efficient/i.test(text);
      return { target: isBudget ? 'budget' : isRoute ? 'route' : 'all' };
    },
  },

  // --- GET SUGGESTIONS ---
  {
    intent: 'GET_SUGGESTIONS',
    patterns: [
      /what\s+should\s+i\s+(?:do|see|visit|eat)/i,
      /suggest\s+(?:some\s+)?(?:activities|things|places)/i,
      /what\s+(?:activities|things)\s+(?:can|should)\s+i/i,
      /recommend\s+(?:something|activities|places)/i,
      /any\s+(?:good\s+)?(?:suggestions|recommendations|ideas)/i,
    ],
    extract: (text) => {
      const cityMatch = text.match(/in\s+([A-Za-z\s]+?)(?:\s*\?|\s*$)/i);
      return { city: cityMatch?.[1]?.trim() };
    },
  },

  // --- GET PACKING TIPS ---
  {
    intent: 'PACKING_TIPS',
    patterns: [
      /what\s+(?:should\s+i\s+|to\s+)?pack/i,
      /(?:packing\s+list|what\s+to\s+bring)/i,
      /suggest\s+(?:what\s+to\s+)?pack/i,
    ],
    extract: () => ({}),
  },

  // --- BUDGET CHECK ---
  {
    intent: 'BUDGET_CHECK',
    patterns: [
      /how\s+(?:much|expensive)/i,
      /is\s+(?:my\s+)?budget\s+(?:enough|realistic|ok)/i,
      /can\s+i\s+afford/i,
      /am\s+i\s+over\s+budget/i,
      /what\s+(?:does|will)\s+(?:it|this)\s+cost/i,
    ],
    extract: () => ({}),
  },
];

// Helpers
function extractRegion(text) {
  const regions = {
    'europe': ['europe', 'european', 'paris', 'rome', 'london', 'santorini'],
    'india': ['india', 'goa', 'udaipur', 'manali', 'jaipur', 'kerala', 'rishikesh', 'coorg', 'spiti', 'varanasi', 'andaman', 'darjeeling', 'hampi', 'mumbai', 'delhi', 'bangalore', 'hyderabad', 'kolkata', 'agra', 'kashmir', 'ladakh', 'amritsar'],
    'southeast asia': ['bali', 'singapore', 'thailand', 'vietnam'],
    'east asia': ['japan', 'tokyo', 'korea'],
    'middle east': ['dubai', 'uae'],
    'north america': ['usa', 'new york'],
  };
  const lower = text.toLowerCase();
  for (const [region, keywords] of Object.entries(regions)) {
    if (keywords.some(k => lower.includes(k))) return region;
  }
  return null;
}

function extractStyle(text) {
  const lower = text.toLowerCase();
  if (lower.match(/\b(backpack|budget|cheap|low.?cost|shoestring)\b/)) return 'budget';
  if (lower.match(/\b(luxury|lavish|premium|5.?star|five.?star|splurge)\b/)) return 'luxury';
  return 'moderate';
}

function parseIntent(text) {
  for (const def of INTENT_PATTERNS) {
    for (const pattern of def.patterns) {
      if (pattern.test(text)) {
        return {
          intent: def.intent,
          params: def.extract(text),
          original: text,
        };
      }
    }
  }
  return {
    intent: 'UNKNOWN',
    params: {},
    original: text,
  };
}

module.exports = { parseIntent };
