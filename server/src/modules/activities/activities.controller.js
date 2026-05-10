const activitiesService = require('./activities.service');
const asyncHandler = require('../../utils/asyncHandler');

const getActivities = asyncHandler(async (req, res) => {
  const data = await activitiesService.getActivities(req.query);
  res.json({ success: true, ...data });
});

const addActivityToStop = asyncHandler(async (req, res) => {
  const data = await activitiesService.addActivityToStop(req.params.stopId, req.body);
  res.status(201).json({ success: true, data });
});

const removeActivityFromStop = asyncHandler(async (req, res) => {
  await activitiesService.removeActivityFromStop(req.params.stopActivityId, req.params.stopId);
  res.json({ success: true, message: 'Activity removed' });
});

module.exports = { getActivities, addActivityToStop, removeActivityFromStop };
