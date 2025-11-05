const { get, set, del, clear, getStats, resetStats } = require('../cache/cacheStore');

describe('Cache Store', () => {
  beforeEach(() => {
    clear();
    resetStats();
  });

  test('should set and get values', () => {
    set('key1', 'value1');
    expect(get('key1')).toBe('value1');
  });

  test('should return undefined for non-existent keys', () => {
    expect(get('nonexistent')).toBeUndefined();
  });

  test('should delete values', () => {
    set('key1', 'value1');
    del('key1');
    expect(get('key1')).toBeUndefined();
  });

  test('should clear all values', () => {
    set('key1', 'value1');
    set('key2', 'value2');
    clear();
    expect(get('key1')).toBeUndefined();
    expect(get('key2')).toBeUndefined();
  });

  test('should track cache statistics', () => {
    set('key1', 'value1');
    get('key1');
    get('nonexistent');
    
    const stats = getStats();
    expect(stats.sets).toBe(1);
    expect(stats.hits).toBe(1);
    expect(stats.misses).toBe(1);
    expect(stats.size).toBe(1);
  });
});