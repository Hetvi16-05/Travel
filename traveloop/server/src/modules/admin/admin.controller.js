const adminService = require('./admin.service');
const asyncHandler = require('../../utils/asyncHandler');

const getStats = asyncHandler(async (req, res) => {
  const data = await adminService.getStats();
  res.json({ success: true, data });
});

const getUsers = asyncHandler(async (req, res) => {
  const data = await adminService.getUsers(req.query);
  res.json({ success: true, ...data });
});

const createCity = asyncHandler(async (req, res) => {
  const data = await adminService.createCity(req.body);
  res.status(201).json({ success: true, data });
});

const deleteCity = asyncHandler(async (req, res) => {
  await adminService.deleteCity(req.params.cityId);
  res.json({ success: true, message: 'City deactivated' });
});

module.exports = { getStats, getUsers, createCity, deleteCity };
