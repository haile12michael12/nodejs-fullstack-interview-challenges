const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Post extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 200]
        }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      status: {
        type: DataTypes.ENUM('draft', 'published', 'archived'),
        defaultValue: 'draft'
      },
      published_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Post',
      tableName: 'posts',
      indexes: [
        {
          unique: true,
          fields: ['slug']
        },
        {
          fields: ['status']
        },
        {
          fields: ['author_id']
        },
        {
          fields: ['published_at']
        }
      ]
    });
  }

  // Instance methods
  isPublished() {
    return this.status === 'published';
  }

  publish() {
    this.status = 'published';
    this.published_at = new Date();
  }
}

Post.init(sequelize);

module.exports = Post;