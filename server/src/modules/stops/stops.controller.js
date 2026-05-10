const stopsService = require('./stops.service');
const asyncHandler = require('../../utils/asyncHandler');

const getStops = asyncHandler(async (req, res) => {
  const data = await stopsService.getStops(req.params.tripId, req.user.id);
  res.json({ success: true, data });
});

const createStop = asyncHandler(async (req, res) => {
  const data = await stopsService.createStop(req.params.tripId, req.user.id, req.body);
  res.status(201).json({ success: true, data });
});

const updateStop = asyncHandler(async (req, res) => {
  const data = await stopsService.updateStop(req.params.stopId, req.params.tripId, req.user.id, req.body);
  res.json({ success: true, data });
});

const deleteStop = asyncHandler(async (req, res) => {
  await stopsService.deleteStop(req.params.stopId, req.params.tripId, req.user.id);
  res.json({ success: true, message: 'Stop deleted' });
});

module.exports = { getStops, createStop, updateStop, deleteStop };
