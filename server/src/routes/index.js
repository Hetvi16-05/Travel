const { Router } = require('express');

const authRoutes       = require('../modules/auth/auth.routes');
const usersRoutes      = require('../modules/users/users.routes');
const citiesRoutes     = require('../modules/cities/cities.routes');
const tripsRoutes      = require('../modules/trips/trips.routes');
const stopsRoutes      = require('../modules/stops/stops.routes');
const activitiesRoutes = require('../modules/activities/activities.routes');
const budgetRoutes     = require('../modules/budget/budget.routes');
const checklistRoutes  = require('../modules/checklist/checklist.routes');
const notesRoutes      = require('../modules/notes/notes.routes');
const shareRoutes      = require('../modules/share/share.routes');
const adminRoutes      = require('../modules/admin/admin.routes');
const savedDestinationsRoutes = require('../modules/saved_destinations/saved_destinations.routes');


const router = Router();

// Health check
router.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// Auth
router.use('/auth', authRoutes);

// Users
router.use('/users', usersRoutes);

// Cities
router.use('/cities', citiesRoutes);

// Saved Destinations
router.use('/saved-destinations', savedDestinationsRoutes);


// Trips + nested resources
router.use('/trips', tripsRoutes);
router.use('/trips/:tripId/stops',     stopsRoutes);
router.use('/trips/:tripId/budget',    budgetRoutes);
router.use('/trips/:tripId/checklist', checklistRoutes);
router.use('/trips/:tripId/notes',     notesRoutes);

// Activity catalog
router.use('/activities', activitiesRoutes);

// Public share
router.use('/share', shareRoutes);

// Admin
router.use('/admin', adminRoutes);

module.exports = router;
