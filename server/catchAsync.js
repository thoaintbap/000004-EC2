const logger = require('./logger');

const catchAsync = (fn) => (req, res, next) => {
  logger.info(`${req.method} - ${req.url}`);
  Promise.resolve(fn(req, res, next)).catch((err) => {
    logger.error(err);
    res.status(500).send('Server Error');
  });
};

module.exports = catchAsync;
