const Joi = require('joi');

// Product validation schema
const productSchema = Joi.object({
  id: Joi.string().uuid().optional(),
  name: Joi.string().min(3).max(100).required().messages({
    'string.min': 'Product name must be at least 3 characters long',
    'string.max': 'Product name must be less than 100 characters long',
    'any.required': 'Product name is required'
  }),
  description: Joi.string().max(1000).optional().messages({
    'string.max': 'Product description must be less than 1000 characters long'
  }),
  price: Joi.number().precision(2).min(0).required().messages({
    'number.min': 'Price must be greater than or equal to 0',
    'number.precision': 'Price must have at most 2 decimal places',
    'any.required': 'Price is required'
  }),
  category: Joi.string().valid('electronics', 'clothing', 'books', 'home', 'sports').required().messages({
    'any.only': 'Category must be one of: electronics, clothing, books, home, sports',
    'any.required': 'Category is required'
  }),
  inStock: Joi.boolean().default(true),
  tags: Joi.array().items(Joi.string().min(2).max(20)).max(10).optional().messages({
    'array.max': 'Product can have at most 10 tags',
    'string.min': 'Tags must be at least 2 characters long',
    'string.max': 'Tags must be less than 20 characters long'
  }),
  specifications: Joi.object().pattern(Joi.string(), Joi.any()).optional(),
  createdAt: Joi.date().iso().optional(),
  updatedAt: Joi.date().iso().optional()
});

// Product creation schema (without ID and timestamps)
const productCreateSchema = productSchema.fork(['id', 'createdAt', 'updatedAt'], (schema) => schema.optional());

// Product update schema (all fields optional)
const productUpdateSchema = productSchema.fork(Object.keys(productSchema.describe().keys), (schema) => schema.optional());

module.exports = {
  productSchema,
  productCreateSchema,
  productUpdateSchema
};