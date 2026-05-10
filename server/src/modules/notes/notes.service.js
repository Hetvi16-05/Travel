const { query } = require('../../config/db');
const ApiError = require('../../utils/ApiError');

const assertTripOwner = async (tripId, userId) => {
  const r = await query('SELECT id FROM trips WHERE id = $1 AND user_id = $2', [tripId, userId]);
  if (!r.rows[0]) throw ApiError.forbidden('Access denied');
};

const getNotes = async (tripId, userId) => {
  await assertTripOwner(tripId, userId);
  const result = await query(
    'SELECT * FROM trip_notes WHERE trip_id = $1 ORDER BY created_at DESC',
    [tripId]
  );
  return result.rows;
};

const createNote = async (tripId, userId, data) => {
  await assertTripOwner(tripId, userId);
  const result = await query(
    `INSERT INTO trip_notes (trip_id, title, content) VALUES ($1, $2, $3) RETURNING *`,
    [tripId, data.title, data.content]
  );
  return result.rows[0];
};

const updateNote = async (noteId, tripId, userId, data) => {
  await assertTripOwner(tripId, userId);
  const result = await query(
    `UPDATE trip_notes SET title = COALESCE($1, title), content = COALESCE($2, content), updated_at = NOW()
     WHERE id = $3 AND trip_id = $4 RETURNING *`,
    [data.title, data.content, noteId, tripId]
  );
  if (!result.rows[0]) throw ApiError.notFound('Note not found');
  return result.rows[0];
};

const deleteNote = async (noteId, tripId, userId) => {
  await assertTripOwner(tripId, userId);
  const result = await query(
    'DELETE FROM trip_notes WHERE id = $1 AND trip_id = $2 RETURNING id',
    [noteId, tripId]
  );
  if (!result.rows[0]) throw ApiError.notFound('Note not found');
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
