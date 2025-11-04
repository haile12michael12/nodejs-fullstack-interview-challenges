const { User, Post } = require('../models');

// Create a new user
async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get user by ID with related data
async function getUserById(req, res) {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          as: 'posts',
          attributes: ['id', 'title', 'slug', 'published_at']
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createUser,
  getUserById
};