'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pala extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  pala.init({
    name: DataTypes.STRING,
    kondisi: DataTypes.INTEGER,
    bunyi: DataTypes.INTEGER,
    serangga: DataTypes.INTEGER,
    jamur: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pala',
  });
  return pala;
};