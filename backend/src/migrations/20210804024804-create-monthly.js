"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("monthlies", {
      monthly_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      month: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.STRING,
      },

      //statics
      cnt_schedule: Sequelize.INTEGER,
      cnt_finished_schedule: {
        type: Sequelize.INTEGER,
      },
      sum_point: Sequelize.INTEGER,

      //environment 추가
      sum_humidity: Sequelize.INTEGER,
      sum_illuminance: Sequelize.INTEGER,
      sum_noise: Sequelize.INTEGER,
      sum_temperature: Sequelize.INTEGER,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("monthlies");
  },
};
