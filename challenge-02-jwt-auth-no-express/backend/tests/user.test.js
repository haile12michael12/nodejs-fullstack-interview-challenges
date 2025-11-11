// User tests
const { User } = require('../data/users.json.js');

describe('User Model', () => {
  test('should find user by credentials', async () => {
    const user = await User.findByCredentials('admin', 'password123');
    expect(user).not.toBeNull();
    expect(user.username).toBe('admin');
  });

  test('should not find user with wrong credentials', async () => {
    const user = await User.findByCredentials('admin', 'wrongpassword');
    expect(user).toBeNull();
  });

  test('should find user by id', async () => {
    const user = await User.findById(1);
    expect(user).not.toBeNull();
    expect(user.username).toBe('admin');
  });

  test('should find user by username', async () => {
    const user = await User.findByUsername('admin');
    expect(user).not.toBeNull();
    expect(user.id).toBe(1);
  });

  test('should get all users', async () => {
    const users = await User.findAll();
    expect(users.length).toBe(2);
  });
});