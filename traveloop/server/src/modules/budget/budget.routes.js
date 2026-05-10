const { Router } = require('express');
const controller = require('./budget.controller');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const { createBudgetItemSchema, updateBudgetItemSchema } = require('./budget.schema');

const router = Router({ mergeParams: true });

router.use(protect);

router.get('/',                validate({}),                  controller.getBudgetItems);
router.post('/',               validate(createBudgetItemSchema), controller.createBudgetItem);
router.patch('/:itemId',       validate(updateBudgetItemSchema), controller.updateBudgetItem);
router.delete('/:itemId',                                     controller.deleteBudgetItem);

module.exports = router;
