const LRU = require('lru-cache');
const { cache } = require('../config');

// Create LRU cache instance
const cacheStore = new LRU({
  max: cache.maxItems,
  ttl: cache.ttl * 1000, // Convert seconds to milliseconds
  allowStale: false,
  updateAgeOnGet: true,
  updateAgeOnHas: true
});

// Cache statistics
let cacheStats = {
  hits: 0,
  misses: 0,
  sets: 0
};

const get = (key) => {
  const value = cacheStore.get(key);
  if (value !== undefined) {
    cacheStats.hits++;
  } else {
    cacheStats.misses++;
  }
  return value;
};

const set = (key, value) => {
  cacheStore.set(key, value);
  cacheStats.sets++;
};

const del = (key) => {
  cacheStore.delete(key);
};

const clear = () => {
  cacheStore.clear();
};

const getStats = () => {
  return {
    ...cacheStats,
    size: cacheStore.size,
    max: cacheStore.max
  };
};

const resetStats = () => {
  cacheStats = {
    hits: 0,
    misses: 0,
    sets: 0
  };
};

module.exports = {
  get,
  set,
  del,
  clear,
  getStats,
  resetStats
};