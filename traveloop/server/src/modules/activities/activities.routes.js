const { Router } = require('express');
const controller = require('./activities.controller');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const { searchSchema, addToStopSchema } = require('./activities.schema');

const router = Router({ mergeParams: true });

router.use(protect);

// Catalog search: GET /api/activities?city_id=&category=&q=
router.get('/', validate(searchSchema), controller.getActivities);

// Stop activities: POST /api/trips/:tripId/stops/:stopId/activities
router.post('/stops/:stopId/activities', validate(addToStopSchema), controller.addActivityToStop);
router.delete('/stops/:stopId/activities/:stopActivityId', controller.removeActivityFromStop);

module.exports = router;
