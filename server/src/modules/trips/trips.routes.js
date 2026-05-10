const { Router } = require('express');
const controller = require('./trips.controller');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const { createTripSchema, updateTripSchema } = require('./trips.schema');

const router = Router();

router.use(protect);

router.get('/',                        controller.getAllTrips);
router.post('/',  validate(createTripSchema), controller.createTrip);
router.get('/:id',                     controller.getTripById);
router.patch('/:id', validate(updateTripSchema), controller.updateTrip);
router.delete('/:id',                  controller.deleteTrip);
router.post('/:id/share',              controller.generateShare);
router.post('/:id/ai-populate',        controller.aiPopulate);

module.exports = router;
