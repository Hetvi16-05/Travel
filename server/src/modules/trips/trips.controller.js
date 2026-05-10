const tripsService = require('./trips.service');
const asyncHandler = require('../../utils/asyncHandler');

const getAllTrips = asyncHandler(async (req, res) => {
  const data = await tripsService.getAllTrips(req.user.id);
  res.json({ success: true, data });
});

const getTripById = asyncHandler(async (req, res) => {
  const data = await tripsService.getTripById(req.params.id, req.user.id);
  res.json({ success: true, data });
});

const createTrip = asyncHandler(async (req, res) => {
  const data = await tripsService.createTrip(req.user.id, req.body);
  res.status(201).json({ success: true, data });
});

const updateTrip = asyncHandler(async (req, res) => {
  const data = await tripsService.updateTrip(req.params.id, req.user.id, req.body);
  res.json({ success: true, data });
});

const deleteTrip = asyncHandler(async (req, res) => {
  await tripsService.deleteTrip(req.params.id, req.user.id);
  res.json({ success: true, message: 'Trip deleted' });
});

const generateShare = asyncHandler(async (req, res) => {
  const shareToken = await tripsService.generateShare(req.params.id, req.user.id);
  res.json({ success: true, data: { shareToken } });
});

module.exports = { getAllTrips, getTripById, createTrip, updateTrip, deleteTrip, generateShare };
