const ApiError = require('../utils/ApiError');

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [];

  // Handle unexpected/non-operational errors
  if (!err.isOperational) {
    statusCode = 500;
    message = 'Something went wrong. Please try again later.';
    errors = [];

    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Unhandled Error:', err);
    }
  }

  // PostgreSQL unique violation
  if (err.code === '23505') {
    statusCode = 409;
    message = 'A record with that value already exists.';
  }

  // PostgreSQL foreign key violation
  if (err.code === '23503') {
    statusCode = 400;
    message = 'Referenced resource does not exist.';
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors.length > 0 && { errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
