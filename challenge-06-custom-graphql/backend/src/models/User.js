class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' }
  ];

  static findAll() {
    return this.users.map(user => new User(user.id, user.name, user.email));
  }

  static findById(id) {
    const user = this.users.find(u => u.id === id);
    return user ? new User(user.id, user.name, user.email) : null;
  }

  static create({ name, email }) {
    const id = Math.max(...this.users.map(u => u.id)) + 1;
    const user = { id, name, email };
    this.users.push(user);
    return new User(user.id, user.name, user.email);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email
    };
  }
}

module.exports = { User };