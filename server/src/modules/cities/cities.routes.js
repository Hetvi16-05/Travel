const { Router } = require('express');
const controller = require('./cities.controller');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const { searchSchema } = require('./cities.schema');

const { track } = require('../../middleware/trackEvent');

const router = Router();

router.get('/',    protect, validate(searchSchema), track('search_city'), controller.searchCities);
router.get('/:id', protect, track('view_city', (req) => req.params.id), controller.getCityById);

module.exports = router;
