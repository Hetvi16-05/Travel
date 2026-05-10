const savedDestinationsService = require('./saved_destinations.service');
const asyncHandler = require('../../utils/asyncHandler');

const getSavedDestinations = asyncHandler(async (req, res) => {
  const data = await savedDestinationsService.getSavedDestinations(req.user.id);
  res.json({ success: true, data });
});

const saveDestination = asyncHandler(async (req, res) => {
  const data = await savedDestinationsService.saveDestination(req.user.id, req.body.city_id);
  res.status(201).json({ success: true, data });
});

const unsaveDestination = asyncHandler(async (req, res) => {
  await savedDestinationsService.unsaveDestination(req.user.id, req.params.cityId);
  res.json({ success: true, message: 'Destination removed from saved list' });
});

module.exports = {
  getSavedDestinations,
  saveDestination,
  unsaveDestination,
};
