const { Router } = require('express');
const controller = require('./saved_destinations.controller');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const { saveDestinationSchema } = require('./saved_destinations.schema');

const router = Router();

router.use(protect);

router.get('/',                            controller.getSavedDestinations);
router.post('/',    validate(saveDestinationSchema), controller.saveDestination);
router.delete('/:cityId',                 controller.unsaveDestination);

module.exports = router;
