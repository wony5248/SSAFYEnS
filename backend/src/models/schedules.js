"use strict";
const { Model } = require("sequelize");
const { user_id } = require("../validation/averageValidation");
module.exports = (sequelize, DataTypes) => {
  class schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.schedules.hasMany(models.users, { foreignKey: "user_id" });
    }
  }
  schedules.init(
    {
      user_id: DataTypes.STRING,
      month: DataTypes.STRING,
      year: DataTypes.STRING,
      week: DataTypes.STRING,
      date: DataTypes.DATE,
      title: DataTypes.STRING,
      context: DataTypes.STRING,
      started_at: DataTypes.DATE,
      finished_at: DataTypes.DATE,
      deadline_at: DataTypes.DATE,
      point: DataTypes.INTEGER,
      is_finished: DataTypes.BOOLEAN,
      notification: DataTypes.DATE,
      noti_extend: DataTypes.INTEGER,
      challenge_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "schedules",
    }
  );
  return schedules;
};
