/**
 * @typedef {object} User
 * @property {string} id.required - User ID
 * @property {string} name.required - User name
 * @property {string} email.required - User email
 * @property {number} age - User age
 * @property {string} createdAt - User creation timestamp
 */

/**
 * @typedef {object} CreateUserRequest
 * @property {string} name.required - User name
 * @property {string} email.required - User email
 * @property {number} age - User age
 */

/**
 * @typedef {object} UpdateUserRequest
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {number} age - User age
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