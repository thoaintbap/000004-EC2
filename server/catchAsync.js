const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => res.status(500).send('Server Error'));
};

module.exports = catchAsync;
