// User schema definition
const userSchema = {
  type: 'object',
  required: ['id', 'name', 'email'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'User ID',
      example: '123e4567-e89b-12d3-a456-426614174000'
    },
    name: {
      type: 'string',
      description: 'User name',
      example: 'John Doe'
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'User email',
      example: 'john.doe@example.com'
    },
    age: {
      type: 'integer',
      minimum: 0,
      description: 'User age',
      example: 30
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'User creation timestamp',
      example: '2023-01-01T00:00:00Z'
    }
  }
};

// User creation schema
const createUserSchema = {
  type: 'object',
  required: ['name', 'email'],
  properties: {
    name: {
      type: 'string',
      description: 'User name',
      example: 'John Doe'
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'User email',
      example: 'john.doe@example.com'
    },
    age: {
      type: 'integer',
      minimum: 0,
      description: 'User age',
      example: 30
    }
  }
};

module.exports = {
  userSchema,
  createUserSchema
};