const citiesService = require('./cities.service');
const asyncHandler = require('../../utils/asyncHandler');

const searchCities = asyncHandler(async (req, res) => {
  const data = await citiesService.searchCities(req.query);
  res.json({ success: true, ...data });
});

const getCityById = asyncHandler(async (req, res) => {
  const city = await citiesService.getCityById(req.params.id);
  res.json({ success: true, data: city });
});

module.exports = { searchCities, getCityById };
