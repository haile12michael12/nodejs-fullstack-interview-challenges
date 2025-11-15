// Simple in-memory user model
class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

// In-memory storage
let users = [];

class UserModel {
  static async create(userData) {
    const user = new User(
      userData.id || require('crypto').randomUUID(),
      userData.name,
      userData.email
    );
    
    users.push(user);
    return user;
  }
  
  static async findById(id) {
    return users.find(user => user.id === id);
  }
  
  static async findByEmail(email) {
    return users.find(user => user.email === email);
  }
  
  static async findAll() {
    return users;
  }
  
  static async update(id, updateData) {
    const user = await this.findById(id);
    if (!user) return null;
    
    Object.assign(user, updateData, { updatedAt: new Date().toISOString() });
    return user;
  }
  
  static async delete(id) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return false;
    
    users.splice(index, 1);
    return true;
  }
}

module.exports = UserModel;