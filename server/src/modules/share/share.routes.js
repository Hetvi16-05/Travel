const { Router } = require('express');
const controller = require('./share.controller');

const router = Router();

// Public — no auth required
router.get('/:token', controller.getSharedTrip);

module.exports = router;
