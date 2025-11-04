const { Sequelize } = require('sequelize');

// Database configuration
const sequelize = new Sequelize(process.env.DATABASE_URL || 'sqlite::memory:', {
  logging: false, // Set to console.log to see SQL queries
  define: {
    timestamps: true,
    underscored: true,
  }
});

module.exports = sequelize;