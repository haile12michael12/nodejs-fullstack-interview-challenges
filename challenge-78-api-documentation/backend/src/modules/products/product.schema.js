// Product schema definition
const productSchema = {
  type: 'object',
  required: ['id', 'name', 'price'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Product ID',
      example: '123e4567-e89b-12d3-a456-426614174000'
    },
    name: {
      type: 'string',
      description: 'Product name',
      example: 'Product Name'
    },
    price: {
      type: 'number',
      format: 'float',
      description: 'Product price',
      example: 99.99
    },
    description: {
      type: 'string',
      description: 'Product description',
      example: 'Product description'
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Product creation timestamp',
      example: '2023-01-01T00:00:00Z'
    }
  }
};

// Product creation schema
const createProductSchema = {
  type: 'object',
  required: ['name', 'price'],
  properties: {
    name: {
      type: 'string',
      description: 'Product name',
      example: 'Product Name'
    },
    price: {
      type: 'number',
      format: 'float',
      description: 'Product price',
      example: 99.99
    },
    description: {
      type: 'string',
      description: 'Product description',
      example: 'Product description'
    }
  }
};

module.exports = {
  productSchema,
  createProductSchema
};