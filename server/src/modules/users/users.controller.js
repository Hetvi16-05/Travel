const usersService = require('./users.service');
const asyncHandler = require('../../utils/asyncHandler');

const getMe = asyncHandler(async (req, res) => {
  const user = await usersService.getMe(req.user.id);
  res.json({ success: true, data: user });
});

const updateMe = asyncHandler(async (req, res) => {
  const user = await usersService.updateMe(req.user.id, req.body);
  res.json({ success: true, data: user });
});

const deleteMe = asyncHandler(async (req, res) => {
  await usersService.deleteMe(req.user.id);
  res.json({ success: true, message: 'Account deactivated' });
});

const getSavedDestinations = asyncHandler(async (req, res) => {
  const data = await usersService.getSavedDestinations(req.user.id);
  res.json({ success: true, data });
});

const saveDestination = asyncHandler(async (req, res) => {
  await usersService.saveDestination(req.user.id, req.params.cityId);
  res.json({ success: true, message: 'Destination saved' });
});

const unsaveDestination = asyncHandler(async (req, res) => {
  await usersService.unsaveDestination(req.user.id, req.params.cityId);
  res.json({ success: true, message: 'Destination removed' });
});

const getStats = asyncHandler(async (req, res) => {
  const stats = await usersService.getUserStats(req.user.id);
  res.json({ success: true, data: stats });
});

const getPreferences = asyncHandler(async (req, res) => {
  const prefs = await usersService.getPreferences(req.user.id);
  res.json({ success: true, data: prefs });
});

const updatePreferences = asyncHandler(async (req, res) => {
  const prefs = await usersService.updatePreferences(req.user.id, req.body);
  res.json({ success: true, data: prefs });
});

module.exports = { 
  getMe, 
  updateMe, 
  deleteMe, 
  getSavedDestinations, 
  saveDestination, 
  unsaveDestination, 
  getStats,
  getPreferences,
  updatePreferences
};
