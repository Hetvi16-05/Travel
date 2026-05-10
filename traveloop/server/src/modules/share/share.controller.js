const shareService = require('./share.service');
const asyncHandler = require('../../utils/asyncHandler');

const getSharedTrip = asyncHandler(async (req, res) => {
  const data = await shareService.getSharedTrip(req.params.token);
  res.json({ success: true, data });
});

module.exports = { getSharedTrip };
