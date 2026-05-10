const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// google-auth-library removed

const { query } = require('../../config/db');

// googleClient removed

const ApiError = require('../../utils/ApiError');
const { sanitizeUser } = require('../../utils/helpers');

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  });
  return { accessToken, refreshToken };
};

const register = async ({ name, email, password }) => {
  const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    throw ApiError.conflict('Email is already registered');
  }

  const password_hash = await bcrypt.hash(password, 12);
  const result = await query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, role, avatar_url, created_at`,
    [name, email, password_hash]
  );

  const user = result.rows[0];
  const tokens = generateTokens(user.id);
  return { user, ...tokens };
};

const login = async ({ email, password }) => {
  const result = await query(
    'SELECT * FROM users WHERE email = $1 AND is_active = TRUE',
    [email]
  );

  if (result.rows.length === 0) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const tokens = generateTokens(user.id);
  return { user: sanitizeUser(user), ...tokens };
};

const refreshAccessToken = async (refreshToken) => {
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    throw ApiError.unauthorized('Invalid or expired refresh token');
  }

  const result = await query('SELECT id FROM users WHERE id = $1', [decoded.id]);
  if (result.rows.length === 0) {
    throw ApiError.unauthorized('User not found');
  }

  const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

  return { accessToken };
};

/**
 * Verify a Google id_token and upsert the user in the database.
 * Works for both sign-in and sign-up — Google handles both flows.
 */
const googleAuth = async () => {
  throw ApiError.notImplemented('Google Auth is not implemented yet.');
};

module.exports = { register, login, refreshAccessToken, googleAuth };

