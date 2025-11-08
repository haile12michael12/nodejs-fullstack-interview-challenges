const express = require('express');
const { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} = require('./user.controller');
const { authenticate, authorize } = require('../../middleware/auth');
const { validateBody, validateParams } = require('../../middleware/validate');

const router = express.Router();

/**
 * @route GET /api/users
 * @group Users - Operations about users
 * @returns {Array.<User>} 200 - An array of users
 * @returns {Error} 500 - Internal server error
 * @security JWT
 */
router.get('/', authenticate, authorize(), getAllUsers);

/**
 * @route GET /api/users/{id}
 * @group Users - Operations about users
 * @param {string} id.path.required - User ID
 * @returns {User.model} 200 - User object
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Internal server error
 * @security JWT
 */
router.get('/:id', authenticate, authorize(), validateParams(['id']), getUserById);

/**
 * @route POST /api/users
 * @group Users - Operations about users
 * @param {User.model} user.body.required - User object
 * @returns {User.model} 201 - Created user object
 * @returns {Error} 400 - Validation error
 * @returns {Error} 500 - Internal server error
 * @security JWT
 */
router.post('/', authenticate, authorize(), validateBody(['name', 'email']), createUser);

/**
 * @route PUT /api/users/{id}
 * @group Users - Operations about users
 * @param {string} id.path.required - User ID
 * @param {User.model} user.body.required - User object
 * @returns {User.model} 200 - Updated user object
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Internal server error
 * @security JWT
 */
router.put('/:id', authenticate, authorize(), validateParams(['id']), validateBody(['name', 'email']), updateUser);

/**
 * @route DELETE /api/users/{id}
 * @group Users - Operations about users
 * @param {string} id.path.required - User ID
 * @returns {object} 200 - Success message
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Internal server error
 * @security JWT
 */
router.delete('/:id', authenticate, authorize(), validateParams(['id']), deleteUser);

module.exports = router;