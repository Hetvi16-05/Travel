const { query } = require('../config/db');

/**
 * Track Event Middleware
 * Non-blocking event logging for user behavior tracking.
 */
const track = (eventType, getEntityId = null) => {
  return (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) return next();

    // Intercept res.json to log event after successful response
    const originalJson = res.json.bind(res);
    res.json = function (data) {
      if (res.statusCode < 400) {
        // Fire and forget logging
        const entityId = getEntityId ? getEntityId(req, data) : null;
        const entityType = eventType.split('_').pop(); // e.g., view_city -> city

        query(
          'INSERT INTO user_events (user_id, event_type, entity_id, entity_type) VALUES ($1, $2, $3, $4)',
          [userId, eventType, entityId, entityType]
        ).catch(err => console.error('[Tracking Error]', err.message));
      }
      return originalJson(data);
    };

    next();
  };
};

module.exports = { track };
