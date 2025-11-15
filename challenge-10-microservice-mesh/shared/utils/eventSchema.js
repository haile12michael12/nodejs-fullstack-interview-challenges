const Joi = require('joi');

// User event schema
const userEventSchema = Joi.object({
  id: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  createdAt: Joi.date().iso().required(),
  updatedAt: Joi.date().iso().required()
});

// Email event schema
const emailEventSchema = Joi.object({
  userId: Joi.string().required(),
  email: Joi.string().email().required(),
  subject: Joi.string().required(),
  body: Joi.string().required(),
  sentAt: Joi.date().iso().required()
});

module.exports = {
  user: userEventSchema,
  email: emailEventSchema
};