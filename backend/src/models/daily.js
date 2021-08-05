"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class daily extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  daily.init(
    {
      date: DataTypes.DATE,
      week: DataTypes.STRING,
      month: DataTypes.STRING,
      year: DataTypes.STRING,
      user_id: DataTypes.STRING,
      context: DataTypes.STRING,
      avgpoint: DataTypes.INTEGER,
      cntschedule: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "daily",
    }
  );
  return daily;
};
