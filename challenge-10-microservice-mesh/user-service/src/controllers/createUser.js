const UserModel = require('../models/User');
const { publishUserEvent } = require('../broker');
const logger = require('../utils/logger');

async function createUser(req, res) {
  try {
    const { name, email } = req.body;
    
    // Validate input
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    // Check if user already exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }
    
    // Create user
    const user = await UserModel.create({ name, email });
    
    // Publish user created event
    try {
      await publishUserEvent('created', user);
    } catch (error) {
      logger.error('Failed to publish user created event', error);
    }
    
    res.status(201).json(user);
  } catch (error) {
    logger.error('Error creating user', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}

module.exports = createUser;