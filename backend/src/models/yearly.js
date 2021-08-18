"use strict";
const { Model } = require("sequelize");
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
  }
  yearly.init(
    {
      yearly_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      year: DataTypes.STRING,
      user_id: DataTypes.STRING,

      //statics
      sum_point: DataTypes.INTEGER,
      cnt_schedule: DataTypes.INTEGER,
      cnt_finished_schedule: DataTypes.INTEGER,

      //environment
      sum_humidity: DataTypes.INTEGER,
      sum_illuminance: DataTypes.INTEGER,
      sum_noise: DataTypes.INTEGER,
      sum_temperature: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "yearly",
      createdAt: false,
      updatedAt: false,
    }
  );
  return yearly;
};
