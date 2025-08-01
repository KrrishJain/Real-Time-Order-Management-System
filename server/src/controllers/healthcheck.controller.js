import logger from '../utils/logger.js';

export const healthCheck = (req, res) => {
  try {
    logger.info('Health check endpoint accessed', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.status(200).json({
      status: 'OK',
      message: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Order Management API',
    });
  } catch (error) {
    logger.error('Health check failed', {
      error: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      status: 'ERROR',
      message: 'Service unavailable',
      timestamp: new Date().toISOString(),
      service: 'Order Management API',
    });
  }
};
