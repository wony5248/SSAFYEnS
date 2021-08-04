'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class yearly extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  yearly.init({
    year: DataTypes.STRING,
    user_id: DataTypes.STRING,
    avgpoint: DataTypes.INTEGER,
    avgpoint: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'yearly',
  });
  return yearly;
};