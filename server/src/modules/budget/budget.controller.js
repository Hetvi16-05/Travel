const budgetService = require('./budget.service');
const asyncHandler = require('../../utils/asyncHandler');

const getBudgetItems = asyncHandler(async (req, res) => {
  const data = await budgetService.getBudgetItems(req.params.tripId, req.user.id);
  res.json({ success: true, data });
});

const createBudgetItem = asyncHandler(async (req, res) => {
  const data = await budgetService.createBudgetItem(req.params.tripId, req.user.id, req.body);
  res.status(201).json({ success: true, data });
});

const updateBudgetItem = asyncHandler(async (req, res) => {
  const data = await budgetService.updateBudgetItem(req.params.itemId, req.params.tripId, req.user.id, req.body);
  res.json({ success: true, data });
});

const deleteBudgetItem = asyncHandler(async (req, res) => {
  await budgetService.deleteBudgetItem(req.params.itemId, req.params.tripId, req.user.id);
  res.json({ success: true, message: 'Budget item deleted' });
});

module.exports = { getBudgetItems, createBudgetItem, updateBudgetItem, deleteBudgetItem };
