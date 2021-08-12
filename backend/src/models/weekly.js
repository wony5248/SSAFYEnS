"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class weekly extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  weekly.init(
    {
      weekly_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      week: DataTypes.STRING,
      month: DataTypes.STRING,
      year: DataTypes.STRING,
      user_id: DataTypes.STRING,

      //
      sum_point: DataTypes.INTEGER,
      cnt_schedule: DataTypes.INTEGER,

      //environment
      sum_humidity: DataTypes.INTEGER,
      sum_illuminance: DataTypes.INTEGER,
      sum_noise: DataTypes.INTEGER,
      sum_temperature: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "weekly",
      createdAt: false,
      updatedAt: false,
    }
  );
  return weekly;
};
