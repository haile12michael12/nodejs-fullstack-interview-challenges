const { createUser, getUserById, getAllUsers, updateUser, deleteUser } = require('../models/userModel');

// Create a new user
const create = (req, res) => {
  try {
    const userData = req.body;
    const newUser = createUser(userData);
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error.message
    });
  }
};

// Get user by ID
const getById = (req, res) => {
  try {
    const { id } = req.params;
    const user = getUserById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User retrieved successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user',
      error: error.message
    });
  }
};

// Get all users
const getAll = (req, res) => {
  try {
    const users = getAllUsers();
    
    res.json({
      success: true,
      message: 'Users retrieved successfully',
      data: users,
      meta: {
        count: users.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users',
      error: error.message
    });
  }
};

// Update user
const update = (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    
    const updatedUser = updateUser(id, userData);
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message
    });
  }
};

// Delete user
const remove = (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = deleteUser(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message
    });
  }
};

// Validate user data without saving
const validate = (req, res) => {
  try {
    const userData = req.body;
    const validation = require('../models/userModel').User.validate(userData);
    
    if (validation.isValid) {
      return res.json({
        success: true,
        message: 'User data is valid',
        data: userData
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'User data validation failed',
      errors: validation.errors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to validate user data',
      error: error.message
    });
  }
};

module.exports = {
  create,
  getById,
  getAll,
  update,
  remove,
  validate
};