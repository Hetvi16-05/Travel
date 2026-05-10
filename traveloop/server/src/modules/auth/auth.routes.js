const { Router } = require('express');
const controller = require('./auth.controller');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const { registerSchema, loginSchema, refreshSchema } = require('./auth.schema');

const router = Router();

router.post('/register', validate(registerSchema), controller.register);
router.post('/login',    validate(loginSchema),    controller.login);
router.post('/refresh',  validate(refreshSchema),  controller.refresh);
router.post('/logout',   protect,                  controller.logout);
router.get('/me',        protect,                  controller.me);

module.exports = router;
