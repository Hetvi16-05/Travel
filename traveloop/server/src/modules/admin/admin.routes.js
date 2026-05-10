const { Router } = require('express');
const controller = require('./admin.controller');
const { protect, restrictTo } = require('../../middleware/auth');

const router = Router();

router.use(protect, restrictTo('admin'));

router.get('/stats',          controller.getStats);
router.get('/users',          controller.getUsers);
router.post('/cities',        controller.createCity);
router.delete('/cities/:cityId', controller.deleteCity);

module.exports = router;
