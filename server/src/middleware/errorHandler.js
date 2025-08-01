import { logger } from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  // Log error with Winston
  logger.error(`Error: ${err.message}`, {
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
  });

  const error = {
    success: false,
    message: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    timestamp: new Date().toISOString(),
  };

  res.status(err.statusCode || 500).json(error);
};

export default errorHandler;
