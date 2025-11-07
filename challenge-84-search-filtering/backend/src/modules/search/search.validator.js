const Joi = require('joi');
const { search } = require('../../config/env');

const searchQueryValidator = Joi.object({
  q: Joi.string().min(search.minLength).optional().messages({
    'string.min': `Search query must be at least ${search.minLength} characters long`,
  }),
  filter: Joi.object().optional(),
  sort: Joi.string().optional(),
  order: Joi.string().valid('asc', 'desc').optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(search.maxResults).default(10),
});

const advancedSearchValidator = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  category: Joi.string().optional(),
  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().min(0).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});

module.exports = {
  searchQueryValidator,
  advancedSearchValidator,
};