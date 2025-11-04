const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Tag extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 50]
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Tag',
      tableName: 'tags',
      indexes: [
        {
          unique: true,
          fields: ['name']
        }
      ]
    });
  }
}

Tag.init(sequelize);

module.exports = Tag;