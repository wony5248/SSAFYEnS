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
      daily_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      date: DataTypes.DATE,
      week: DataTypes.STRING,
      month: DataTypes.STRING,
      year: DataTypes.STRING,
      user_id: DataTypes.STRING,
      daily_context: DataTypes.STRING,
      sum_point: DataTypes.INTEGER,
      cnt_schedule: DataTypes.INTEGER,
      sum_humidity: DataTypes.INTEGER,
      sum_illuminance: DataTypes.INTEGER,
      sum_noise: DataTypes.INTEGER,
      sum_temperature: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "daily",
      createdAt: false,
      updatedAt: false,
    }
  );
  return daily;
};
