const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Comment extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
      }
    }, {
      sequelize,
      modelName: 'Comment',
      tableName: 'comments',
      indexes: [
        {
          fields: ['author_id']
        },
        {
          fields: ['post_id']
        },
        {
          fields: ['status']
        }
      ]
    });
  }

  // Instance methods
  isApproved() {
    return this.status === 'approved';
  }

  approve() {
    this.status = 'approved';
  }

  reject() {
    this.status = 'rejected';
  }
}

Comment.init(sequelize);

module.exports = Comment;