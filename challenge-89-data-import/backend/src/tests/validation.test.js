const { validateData } = require('../utils/validation');

describe('Validation', () => {
  test('should validate correct data', () => {
    const data = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30
    };
    
    const result = validateData(data);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should reject missing name', () => {
    const data = {
      email: 'john.doe@example.com',
      age: 30
    };
    
    const result = validateData(data);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Name is required and must be a non-empty string');
  });

  test('should reject invalid email', () => {
    const data = {
      name: 'John Doe',
      email: 'invalid-email',
      age: 30
    };
    
    const result = validateData(data);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Email is required and must be a valid email address');
  });

  test('should reject invalid age', () => {
    const data = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: -5
    };
    
    const result = validateData(data);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Age must be a number between 0 and 150');
  });
});