// Mock user model (in a real application, this would connect to a database)
const { v4: uuidv4 } = require('uuid');

class User {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.age = data.age;
    this.phone = data.phone;
    this.address = data.address;
    this.preferences = data.preferences;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  // Validate user data
  static validate(userData) {
    // In a real application, this would use the Joi schema
    const errors = [];
    
    if (!userData.firstName || userData.firstName.length < 2) {
      errors.push('First name is required and must be at least 2 characters');
    }
    
    if (!userData.lastName || userData.lastName.length < 2) {
      errors.push('Last name is required and must be at least 2 characters');
    }
    
    if (!userData.email || !userData.email.includes('@')) {
      errors.push('Valid email is required');
    }
    
    if (!userData.age || userData.age < 13 || userData.age > 120) {
      errors.push('Age must be between 13 and 120');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Format user data
  static format(userData) {
    return {
      id: userData.id || uuidv4(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email.toLowerCase().trim(),
      age: parseInt(userData.age),
      phone: userData.phone,
      address: userData.address,
      preferences: {
        newsletter: userData.preferences?.newsletter || false,
        notifications: userData.preferences?.notifications || true,
        theme: userData.preferences?.theme || 'light'
      },
      createdAt: userData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
}

// Mock database storage
const users = [];

// Model methods
const createUser = (userData) => {
  const formattedUser = User.format(userData);
  users.push(formattedUser);
  return formattedUser;
};

const getUserById = (id) => {
  return users.find(user => user.id === id);
};

const getAllUsers = () => {
  return users;
};

const updateUser = (id, userData) => {
  const index = users.findIndex(user => user.id === id);
  if (index === -1) return null;
  
  const updatedUser = { ...users[index], ...userData, id, updatedAt: new Date().toISOString() };
  users[index] = updatedUser;
  return updatedUser;
};

const deleteUser = (id) => {
  const index = users.findIndex(user => user.id === id);
  if (index === -1) return false;
  
  users.splice(index, 1);
  return true;
};

module.exports = {
  User,
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
};