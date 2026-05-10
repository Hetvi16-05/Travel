const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const ApiError = require('./utils/ApiError');

const app = express();

// ─── Security ────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// ─── Logging ─────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ─── Body Parsers ─────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Static Uploads ───────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ─── API Routes ───────────────────────────────────────────
app.use('/api', router);

// ─── Welcome Routes ───────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Welcome to Traveloop API',
    version: '1.0.0',
    docs: '/api'
  });
});

app.get('/api', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Traveloop API v1 — All systems operational',
    endpoints: ['/auth', '/trips', '/cities', '/activities', '/saved-destinations']
  });
});


// ─── 404 Handler ──────────────────────────────────────────
app.use((req, res, next) => {
  next(ApiError.notFound(`Route ${req.method} ${req.path} not found`));
});

// ─── Global Error Handler ─────────────────────────────────
app.use(errorHandler);

module.exports = app;
