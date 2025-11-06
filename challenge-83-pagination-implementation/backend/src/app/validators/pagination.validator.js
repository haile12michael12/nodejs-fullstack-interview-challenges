const Joi = require('joi');
const { pagination } = require('../../config/env');

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(pagination.maxLimit).default(pagination.defaultLimit),
  after: Joi.string().optional(),
  before: Joi.string().optional(),
});

const validatePagination = (req, res, next) => {
  const { error, value } = paginationSchema.validate(req.query);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message),
    });
  }
  
  req.query = value;
  next();
};

module.exports = {
  validatePagination,
};