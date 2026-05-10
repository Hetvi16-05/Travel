const recommendationsService = require('./recommendations.service');
const asyncHandler = require('../../utils/asyncHandler');

const getCityRecommendations = asyncHandler(async (req, res) => {
  const recommendations = await recommendationsService.getCityRecommendations(req.user.id);
  res.json({
    success: true,
    data: recommendations
  });
});

const getActivityRecommendations = asyncHandler(async (req, res) => {
  const { stopId } = req.params;
  const recommendations = await recommendationsService.getActivityRecommendations(stopId, req.user.id);
  res.json({
    success: true,
    data: recommendations
  });
});

const getNextCityRecommendation = asyncHandler(async (req, res) => {
  const { tripId } = req.params;
  const recommendations = await recommendationsService.getNextCityRecommendation(tripId, req.user.id);
  res.json({
    success: true,
    data: recommendations
  });
});

module.exports = {
  getCityRecommendations,
  getActivityRecommendations,
  getNextCityRecommendation
};
