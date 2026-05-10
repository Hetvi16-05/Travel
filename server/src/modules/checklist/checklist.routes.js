const { Router } = require('express');
const controller = require('./checklist.controller');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const { createItemSchema } = require('./checklist.schema');

const router = Router({ mergeParams: true });

router.use(protect);

router.get('/',                controller.getItems);
router.post('/', validate(createItemSchema), controller.createItem);
router.patch('/:itemId/toggle', controller.toggleItem);
router.delete('/:itemId',      controller.deleteItem);

module.exports = router;
