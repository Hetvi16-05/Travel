const { Router } = require('express');
const controller = require('./ai.controller');
const { protect } = require('../../middleware/auth');

const router = Router();

router.use(protect);

router.post('/plan', controller.plan);
router.post('/chat/:tripId', controller.chat);
router.get('/history/:tripId', controller.getHistory);
router.delete('/history/:tripId', controller.clearHistory);

module.exports = router;
