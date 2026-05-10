const express = require('express');
const router = express.Router();
const controller = require('./recommendations.controller');
const { protect } = require('../../middleware/auth');

router.use(protect);

router.get('/cities', controller.getCityRecommendations);
router.get('/activities/:stopId', controller.getActivityRecommendations);
router.get('/next-city/:tripId', controller.getNextCityRecommendation);

module.exports = router;
