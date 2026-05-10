const aiService = require('./ai.service');
const ApiError = require('../../utils/ApiError');
const asyncHandler = require('../../utils/asyncHandler');

const plan = asyncHandler(async (req, res) => {
  const { message, history = [] } = req.body;
  if (!message) throw ApiError.badRequest('Message is required');
  
  const result = await aiService.generatePlan(message.trim(), history);
  res.json({ success: true, data: result });
});

const chat = asyncHandler(async (req, res) => {
  const { tripId } = req.params;
  const { message } = req.body;
  if (!message) throw ApiError.badRequest('Message is required');

  const result = await aiService.chat(tripId, req.user.id, message);
  res.json({ success: true, data: result });
});

const getHistory = asyncHandler(async (req, res) => {
  const { tripId } = req.params;
  const history = await aiService.getHistory(tripId, req.user.id);
  res.json({ success: true, data: history });
});

const clearHistory = asyncHandler(async (req, res) => {
  const { tripId } = req.params;
  await aiService.clearHistory(tripId, req.user.id);
  res.json({ success: true, message: 'History cleared' });
});

module.exports = { plan, chat, getHistory, clearHistory };
