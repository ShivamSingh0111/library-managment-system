const { validateBook } = require('../utils/validator');

exports.validateBookMiddleware = (req, res, next) => {
  const { valid, errors } = validateBook(req.body);
  if (!valid) {
    return res.status(400).json({ errors });
  }
  next();
};