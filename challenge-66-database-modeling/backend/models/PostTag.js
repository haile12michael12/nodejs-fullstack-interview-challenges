const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class PostTag extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'PostTag',
      tableName: 'post_tags',
      indexes: [
        {
          unique: true,
          fields: ['post_id', 'tag_id']
        },
        {
          fields: ['post_id']
        },
        {
          fields: ['tag_id']
        }
      ]
    });
  }
}

PostTag.init(sequelize);

module.exports = PostTag;