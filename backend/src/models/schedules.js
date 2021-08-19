"use strict";
const { Model, INTEGER } = require("sequelize");
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

      // models.schedules.belongsTo(models.challenges, { foreignKey: "challenge_id" });

    }
  }
  schedules.init(
    {
      schedule_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      //user_id
      user_id: DataTypes.STRING,

      //date
      date: DataTypes.DATE,
      week: DataTypes.STRING,
      month: DataTypes.STRING,
      year: DataTypes.STRING,

      //infomation
      title: DataTypes.STRING,
      context: DataTypes.STRING,

      //time
      expectstart_at: DataTypes.DATE,
      started_at: DataTypes.DATE,
      finished_at: DataTypes.DATE,
      deadline_at: DataTypes.DATE,

      //submit
      is_finished: DataTypes.BOOLEAN,
      point: DataTypes.INTEGER,

      //notification
      notification: DataTypes.BOOLEAN,
      notificationtime: DataTypes.DATE,
      noti_extend: DataTypes.INTEGER,

      //environment
      humidity: DataTypes.INTEGER,
      illuminance: DataTypes.INTEGER,
      noise: DataTypes.INTEGER,
      temperature: DataTypes.INTEGER,

      // challenge_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "schedules",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return schedules;
};
