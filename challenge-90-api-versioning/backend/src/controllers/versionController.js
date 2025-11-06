const deprecationManager = require('../utils/deprecationManager');

// Version 1 controllers
const getUsersV1 = (req, res) => {
  res.json({
    version: 'v1',
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]
  });
};

const getUserByIdV1 = (req, res) => {
  const { id } = req.params;
  res.json({
    version: 'v1',
    user: { id: parseInt(id), name: 'John Doe', email: 'john@example.com' }
  });
};

const createUserV1 = (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({
    version: 'v1',
    user: { id: 3, name, email }
  });
};

const updateUserV1 = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  res.json({
    version: 'v1',
    user: { id: parseInt(id), name, email }
  });
};

const deleteUserV1 = (req, res) => {
  const { id } = req.params;
  res.json({
    version: 'v1',
    message: `User ${id} deleted successfully`
  });
};

// Version 2 controllers with enhanced functionality
const getUsersV2 = (req, res) => {
  // Check if v1 is deprecated
  if (deprecationManager.isDeprecated('v1')) {
    res.set('Warning', `299 - "v1 API is deprecated, please migrate to v2"`);
  }
  
  res.json({
    version: 'v2',
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' }
    ]
  });
};

const getUserByIdV2 = (req, res) => {
  const { id } = req.params;
  res.json({
    version: 'v2',
    user: { id: parseInt(id), name: 'John Doe', email: 'john@example.com', status: 'active' }
  });
};

const createUserV2 = (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({
    version: 'v2',
    user: { id: 3, name, email, status: 'active' }
  });
};

const updateUserV2 = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  res.json({
    version: 'v2',
    user: { id: parseInt(id), name, email, status: 'active' }
  });
};

const deleteUserV2 = (req, res) => {
  const { id } = req.params;
  res.json({
    version: 'v2',
    message: `User ${id} deleted successfully`
  });
};

const activateUserV2 = (req, res) => {
  const { id } = req.params;
  res.json({
    version: 'v2',
    message: `User ${id} activated successfully`
  });
};

module.exports = {
  getUsersV1,
  getUserByIdV1,
  createUserV1,
  updateUserV1,
  deleteUserV1,
  getUsersV2,
  getUserByIdV2,
  createUserV2,
  updateUserV2,
  deleteUserV2,
  activateUserV2
};