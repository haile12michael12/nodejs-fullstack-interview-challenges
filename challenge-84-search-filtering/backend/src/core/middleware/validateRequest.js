const Joi = require('joi');
const { search } = require('../../config/env');
const { createErrorResponse } = require('../../core/http/response');

const searchSchema = Joi.object({
  q: Joi.string().min(search.minLength).optional(),
  sort: Joi.string().optional(),
  order: Joi.string().valid('asc', 'desc').optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(search.maxResults).default(10),
}).pattern(Joi.string().regex(/^filter\[/), Joi.any());

const advancedSearchSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  category: Joi.string().optional(),
  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().min(0).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});

const validateSearch = (req, res, next) => {
  const { error, value } = searchSchema.validate(req.query);
  
  if (error) {
    return res.status(400).json(createErrorResponse(error, 'Validation error', 400));
  }
  
  req.query = value;
  next();
};

const validateAdvancedSearch = (req, res, next) => {
  const { error, value } = advancedSearchSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json(createErrorResponse(error, 'Validation error', 400));
  }
  
  req.body = value;
  next();
};

module.exports = {
  validateSearch,
  validateAdvancedSearch,
};