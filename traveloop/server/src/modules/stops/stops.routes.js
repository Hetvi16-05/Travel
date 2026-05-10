const { Router } = require('express');
const controller = require('./stops.controller');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const { createStopSchema, updateStopSchema } = require('./stops.schema');

const router = Router({ mergeParams: true });

router.use(protect);

router.get('/',              controller.getStops);
router.post('/',  validate(createStopSchema), controller.createStop);
router.patch('/:stopId', validate(updateStopSchema), controller.updateStop);
router.delete('/:stopId',    controller.deleteStop);

module.exports = router;
