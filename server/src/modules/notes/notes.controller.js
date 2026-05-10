const notesService = require('./notes.service');
const asyncHandler = require('../../utils/asyncHandler');

const getNotes = asyncHandler(async (req, res) => {
  const data = await notesService.getNotes(req.params.tripId, req.user.id);
  res.json({ success: true, data });
});

const createNote = asyncHandler(async (req, res) => {
  const data = await notesService.createNote(req.params.tripId, req.user.id, req.body);
  res.status(201).json({ success: true, data });
});

const updateNote = asyncHandler(async (req, res) => {
  const data = await notesService.updateNote(req.params.noteId, req.params.tripId, req.user.id, req.body);
  res.json({ success: true, data });
});

const deleteNote = asyncHandler(async (req, res) => {
  await notesService.deleteNote(req.params.noteId, req.params.tripId, req.user.id);
  res.json({ success: true, message: 'Note deleted' });
});

module.exports = { getNotes, createNote, updateNote, deleteNote };
