const Joi = require('joi');

// User validation schema
const userSchema = Joi.object({
  id: Joi.string().uuid().optional(),
  firstName: Joi.string().min(2).max(50).required().messages({
    'string.min': 'First name must be at least 2 characters long',
    'string.max': 'First name must be less than 50 characters long',
    'any.required': 'First name is required'
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Last name must be at least 2 characters long',
    'string.max': 'Last name must be less than 50 characters long',
    'any.required': 'Last name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required'
  }),
  age: Joi.number().integer().min(13).max(120).required().messages({
    'number.min': 'Age must be at least 13',
    'number.max': 'Age must be less than or equal to 120',
    'number.integer': 'Age must be a whole number',
    'any.required': 'Age is required'
  }),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional().messages({
    'string.pattern.base': 'Phone number must be between 10 and 15 digits'
  }),
  address: Joi.object({
    street: Joi.string().max(100).required(),
    city: Joi.string().max(50).required(),
    state: Joi.string().length(2).required(),
    zipCode: Joi.string().pattern(/^[0-9]{5}(-[0-9]{4})?$/).required(),
    country: Joi.string().max(50).default('USA')
  }).optional(),
  preferences: Joi.object({
    newsletter: Joi.boolean().default(false),
    notifications: Joi.boolean().default(true),
    theme: Joi.string().valid('light', 'dark').default('light')
  }).optional()
});

// User creation schema (without ID)
const userCreateSchema = userSchema.fork(['id'], (schema) => schema.optional());

// User update schema (all fields optional except ID)
const userUpdateSchema = userSchema.fork(Object.keys(userSchema.describe().keys), (schema) => schema.optional()).concat(Joi.object({
  id: Joi.string().uuid().required()
}));

module.exports = {
  userSchema,
  userCreateSchema,
  userUpdateSchema
};