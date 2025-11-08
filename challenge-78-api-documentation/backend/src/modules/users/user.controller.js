const { v4: uuidv4 } = require('uuid');
const { successResponse, notFoundResponse, errorResponse } = require('../../utils/response');
const logger = require('../../utils/logger');

// In-memory storage for users (in a real app, this would be a database)
let users = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
    createdAt: new Date().toISOString()
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    age: 25,
    createdAt: new Date().toISOString()
  }
];

/**
 * Get all users
 * @route GET /users
 * @group Users - Operations about users
 * @returns {Array.<User>} 200 - An array of users
 * @returns {Error} 500 - Internal server error
 */
const getAllUsers = (req, res) => {
  try {
    logger.info('Fetching all users');
    return successResponse(res, users, 'Users retrieved successfully');
  } catch (error) {
    logger.error('Error fetching users', error);
    return errorResponse(res, error, 'Failed to retrieve users');
  }
};

/**
 * Get user by ID
 * @route GET /users/{id}
 * @group Users - Operations about users
 * @param {string} id.path.required - User ID
 * @returns {User.model} 200 - User object
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Internal server error
 */
const getUserById = (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id === id);
    
    if (!user) {
      return notFoundResponse(res, 'User not found');
    }
    
    logger.info(`Fetching user with ID: ${id}`);
    return successResponse(res, user, 'User retrieved successfully');
  } catch (error) {
    logger.error('Error fetching user', error);
    return errorResponse(res, error, 'Failed to retrieve user');
  }
};

/**
 * Create a new user
 * @route POST /users
 * @group Users - Operations about users
 * @param {User.model} user.body.required - User object
 * @returns {User.model} 201 - Created user object
 * @returns {Error} 400 - Validation error
 * @returns {Error} 500 - Internal server error
 */
const createUser = (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    // Create new user
    const newUser = {
      id: uuidv4(),
      name,
      email,
      age,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    logger.info(`Created user with ID: ${newUser.id}`);
    return successResponse(res, newUser, 'User created successfully', 201);
  } catch (error) {
    logger.error('Error creating user', error);
    return errorResponse(res, error, 'Failed to create user');
  }
};

/**
 * Update user
 * @route PUT /users/{id}
 * @group Users - Operations about users
 * @param {string} id.path.required - User ID
 * @param {User.model} user.body.required - User object
 * @returns {User.model} 200 - Updated user object
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Internal server error
 */
const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return notFoundResponse(res, 'User not found');
    }
    
    // Update user
    users[userIndex] = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      email: email || users[userIndex].email,
      age: age !== undefined ? age : users[userIndex].age
    };
    
    logger.info(`Updated user with ID: ${id}`);
    return successResponse(res, users[userIndex], 'User updated successfully');
  } catch (error) {
    logger.error('Error updating user', error);
    return errorResponse(res, error, 'Failed to update user');
  }
};

/**
 * Delete user
 * @route DELETE /users/{id}
 * @group Users - Operations about users
 * @param {string} id.path.required - User ID
 * @returns {object} 200 - Success message
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Internal server error
 */
const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return notFoundResponse(res, 'User not found');
    }
    
    // Remove user
    const deletedUser = users.splice(userIndex, 1)[0];
    
    logger.info(`Deleted user with ID: ${id}`);
    return successResponse(res, deletedUser, 'User deleted successfully');
  } catch (error) {
    logger.error('Error deleting user', error);
    return errorResponse(res, error, 'Failed to delete user');
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};