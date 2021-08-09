'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class monthly extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  monthly.init({
    month: DataTypes.STRING,
    year: DataTypes.STRING,
    user_id: DataTypes.STRING,
    avgpoint: DataTypes.STRING,
    avgpoint: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'monthly',
  });
  return monthly;
};