const eventSchema = require('./eventSchema');

function validatePayload(payload, schema = eventSchema) {
  // Simple validation function
  if (!payload) {
    throw new Error('Payload is required');
  }

  // Validate against schema
  const { error } = schema.validate(payload);
  if (error) {
    throw new Error(`Validation error: ${error.message}`);
  }

  return true;
}

module.exports = validatePayload;