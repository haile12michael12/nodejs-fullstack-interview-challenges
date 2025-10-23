const { graphql, buildSchema } = require('graphql');
const schema = require('../schema');

async function executeGraphQL(query, variables = {}, context = {}) {
  try {
    const result = await graphql({
      schema,
      source: query,
      variableValues: variables,
      contextValue: context
    });

    return {
      data: result.data,
      errors: result.errors
    };
  } catch (error) {
    return {
      data: null,
      errors: [{ message: error.message }]
    };
  }
}

function validateQuery(query) {
  if (!query || typeof query !== 'string') {
    return { valid: false, error: 'Query must be a non-empty string' };
  }

  if (query.length > 10000) {
    return { valid: false, error: 'Query too large (max 10,000 characters)' };
  }

  return { valid: true };
}

module.exports = {
  executeGraphQL,
  validateQuery
};




