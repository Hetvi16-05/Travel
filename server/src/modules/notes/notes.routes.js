const { Router } = require('express');
const controller = require('./notes.controller');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const { createNoteSchema, updateNoteSchema } = require('./notes.schema');

const router = Router({ mergeParams: true });

router.use(protect);

router.get('/',             controller.getNotes);
router.post('/', validate(createNoteSchema), controller.createNote);
router.patch('/:noteId', validate(updateNoteSchema), controller.updateNote);
router.delete('/:noteId',   controller.deleteNote);

module.exports = router;
