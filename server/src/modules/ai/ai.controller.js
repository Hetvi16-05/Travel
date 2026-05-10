const { generatePlan } = require('./ai.service');
const ApiError = require('../../utils/ApiError');

/**
 * POST /api/ai/plan
 * Body: { message: string, history: Array<{role, content}> }
 */
async function plan(req, res, next) {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return next(ApiError.badRequest('Message is required'));
    }

    if (message.trim().length > 500) {
      return next(ApiError.badRequest('Message too long (max 500 chars)'));
    }

    const result = await generatePlan(message.trim(), history);

    return res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error('[AI Plan Error]', err.message);
    next(err);
  }
}

module.exports = { plan };
