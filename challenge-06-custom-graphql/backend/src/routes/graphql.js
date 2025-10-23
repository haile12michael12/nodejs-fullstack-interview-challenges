const { parseBody } = require('../utils/request');
const { sendSuccess, sendError } = require('../utils/response');
const { executeGraphQL, validateQuery } = require('../utils/graphql');

async function handleGraphQL(req, res) {
  try {
    const body = await parseBody(req);
    const { query, variables, operationName } = body;

    // Validate query
    const validation = validateQuery(query);
    if (!validation.valid) {
      return sendError(res, 400, validation.error);
    }

    // Execute GraphQL query
    const result = await executeGraphQL(query, variables || {}, {
      req,
      res
    });

    // Check for errors
    if (result.errors && result.errors.length > 0) {
      return sendSuccess(res, {
        data: result.data,
        errors: result.errors
      });
    }

    sendSuccess(res, {
      data: result.data
    });

  } catch (error) {
    console.error('GraphQL execution error:', error);
    sendError(res, 500, 'GraphQL execution failed', error.message);
  }
}

module.exports = {
  handleGraphQL
};




