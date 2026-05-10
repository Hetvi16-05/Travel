module.exports = {
  // User roles
  ROLES: {
    USER: 'user',
    ADMIN: 'admin',
  },

  // Budget categories
  BUDGET_CATEGORIES: [
    'flights',
    'accommodation',
    'food',
    'transport',
    'activities',
    'shopping',
    'visa',
    'insurance',
    'misc',
  ],

  // Checklist categories
  CHECKLIST_CATEGORIES: [
    'documents',
    'clothing',
    'toiletries',
    'electronics',
    'health',
    'misc',
  ],

  // Activity categories
  ACTIVITY_CATEGORIES: [
    'sightseeing',
    'adventure',
    'food',
    'culture',
    'nature',
    'shopping',
    'nightlife',
    'wellness',
  ],

  // File upload limits
  UPLOAD: {
    MAX_SIZE_BYTES: 5 * 1024 * 1024, // 5MB
    ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  },

  // Pagination defaults
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
  },
};
