const checklistService = require('./checklist.service');
const asyncHandler = require('../../utils/asyncHandler');

const getItems = asyncHandler(async (req, res) => {
  const data = await checklistService.getItems(req.params.tripId, req.user.id);
  res.json({ success: true, data });
});

const createItem = asyncHandler(async (req, res) => {
  const data = await checklistService.createItem(req.params.tripId, req.user.id, req.body);
  res.status(201).json({ success: true, data });
});

const toggleItem = asyncHandler(async (req, res) => {
  const data = await checklistService.toggleItem(req.params.itemId, req.params.tripId, req.user.id);
  res.json({ success: true, data });
});

const deleteItem = asyncHandler(async (req, res) => {
  await checklistService.deleteItem(req.params.itemId, req.params.tripId, req.user.id);
  res.json({ success: true, message: 'Item deleted' });
});

module.exports = { getItems, createItem, toggleItem, deleteItem };
