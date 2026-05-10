const { Router } = require('express');
const { plan } = require('./ai.controller');
const { protect } = require('../../middleware/auth');

const router = Router();

// POST /api/ai/plan — protected
router.post('/plan', protect, plan);

module.exports = router;
