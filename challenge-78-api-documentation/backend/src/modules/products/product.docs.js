/**
 * @typedef {object} Product
 * @property {string} id.required - Product ID
 * @property {string} name.required - Product name
 * @property {number} price.required - Product price
 * @property {string} description - Product description
 * @property {string} createdAt - Product creation timestamp
 */

/**
 * @typedef {object} CreateProductRequest
 * @property {string} name.required - Product name
 * @property {number} price.required - Product price
 * @property {string} description - Product description
 */

/**
 * @typedef {object} UpdateProductRequest
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {string} description - Product description
 */

/**
 * @typedef {object} SuccessResponse
 * @property {boolean} success.required - Indicates if the request was successful
 * @property {string} message.required - Response message
 * @property {object} data - Response data
 */

/**
 * @typedef {object} ErrorResponse
 * @property {boolean} success.required - Indicates if the request was successful
 * @property {string} message.required - Error message
 * @property {string} error - Error details
 */