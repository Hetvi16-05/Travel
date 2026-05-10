const authService = require('./auth.service');
const asyncHandler = require('../../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.register(req.body);
  res.status(201).json({ success: true, data: { user, accessToken, refreshToken } });
});

const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);
  res.json({ success: true, data: { user, accessToken, refreshToken } });
});

const refresh = asyncHandler(async (req, res) => {
  const { accessToken } = await authService.refreshAccessToken(req.body.refreshToken);
  res.json({ success: true, data: { accessToken } });
});

const logout = asyncHandler(async (req, res) => {
  // Stateless JWT: client simply discards the token
  res.json({ success: true, message: 'Logged out successfully' });
});

const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { user: req.user } });
});

module.exports = { register, login, refresh, logout, me };
