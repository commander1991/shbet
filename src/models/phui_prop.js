'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phui_Prop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Phui_Prop.init({
    huiId: DataTypes.STRING,
    huiName: DataTypes.STRING,
    huiType: DataTypes.STRING,
    huiValue: DataTypes.INTEGER,
    huiStartDate: DataTypes.DATE,
    huiMember: DataTypes.INTEGER,
    huiNum: DataTypes.INTEGER,
    huiDonate: DataTypes.INTEGER,
    huiBelongTo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Phui_Prop',
    freezeTableName: true
  });
  return Phui_Prop;
};