const { get, set, del, clear, getStats, resetStats } = require('../cache/cacheStore');

class CacheService {
  static get(key) {
    return get(key);
  }

  static set(key, value) {
    return set(key, value);
  }

  static delete(key) {
    return del(key);
  }

  static clear() {
    return clear();
  }

  static getStats() {
    return getStats();
  }

  static resetStats() {
    return resetStats();
  }
}

module.exports = CacheService;