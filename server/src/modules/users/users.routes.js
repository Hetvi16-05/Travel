const { Router } = require('express');
const controller = require('./users.controller');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const { updateUserSchema } = require('./users.schema');

const router = Router();

router.use(protect);

router.get('/me',    controller.getMe);
router.patch('/me',  validate(updateUserSchema), controller.updateMe);
router.delete('/me', controller.deleteMe);

router.get('/me/saved',              controller.getSavedDestinations);
router.post('/me/saved/:cityId',     controller.saveDestination);
router.delete('/me/saved/:cityId',   controller.unsaveDestination);

module.exports = router;
