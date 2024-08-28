'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Group, {
        foreignKey: 'groupId'
      })
    }
  }
  User.init({
    userId: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    point: DataTypes.INTEGER,
    pointLock: DataTypes.INTEGER,
    linkInfo: DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true
  });
  return User;
};