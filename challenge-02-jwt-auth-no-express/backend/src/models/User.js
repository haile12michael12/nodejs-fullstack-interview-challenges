class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  static users = [
    { id: 1, username: 'admin', password: 'password123' },
    { id: 2, username: 'user', password: 'user123' }
  ];

  static async findByCredentials(username, password) {
    const user = this.users.find(u => 
      u.username === username && u.password === password
    );
    return user ? new User(user.id, user.username, user.password) : null;
  }

  static async findById(id) {
    const user = this.users.find(u => u.id === id);
    return user ? new User(user.id, user.username, user.password) : null;
  }

  static async findByUsername(username) {
    const user = this.users.find(u => u.username === username);
    return user ? new User(user.id, user.username, user.password) : null;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username
    };
  }
}

module.exports = { User };

