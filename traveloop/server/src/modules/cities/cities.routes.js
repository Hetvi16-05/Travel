const { Router } = require('express');
const controller = require('./cities.controller');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const { searchSchema } = require('./cities.schema');

const router = Router();

router.get('/',    protect, validate(searchSchema), controller.searchCities);
router.get('/:id', protect, controller.getCityById);

module.exports = router;
