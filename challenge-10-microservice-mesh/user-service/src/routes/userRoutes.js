const express = require('express');
const createUser = require('../controllers/createUser');

const router = express.Router();

// Create user
router.post('/', createUser);

// Get all users
router.get('/', async (req, res) => {
  try {
    const UserModel = require('../models/User');
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    const logger = require('../utils/logger');
    logger.error('Error fetching users', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const UserModel = require('../models/User');
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    const logger = require('../utils/logger');
    logger.error('Error fetching user', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const UserModel = require('../models/User');
    const { name, email } = req.body;
    
    const user = await UserModel.update(req.params.id, { name, email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    const logger = require('../utils/logger');
    logger.error('Error updating user', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const UserModel = require('../models/User');
    const deleted = await UserModel.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    const logger = require('../utils/logger');
    logger.error('Error deleting user', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;