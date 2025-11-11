// Mock user DB
const usersData = require('./users.json');

class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  static async findByCredentials(username, password) {
    const user = usersData.users.find(u => 
      u.username === username && u.password === password
    );
    return user ? new User(user.id, user.username, user.password) : null;
  }

  static async findById(id) {
    const user = usersData.users.find(u => u.id === id);
    return user ? new User(user.id, user.username, user.password) : null;
  }

  static async findByUsername(username) {
    const user = usersData.users.find(u => u.username === username);
    return user ? new User(user.id, user.username, user.password) : null;
  }

  static async findAll() {
    return usersData.users.map(u => new User(u.id, u.username, u.password));
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username
    };
  }
}

module.exports = { User };