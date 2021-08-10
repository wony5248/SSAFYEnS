"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("dailies", {
      daily_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.STRING,
      },
      week: {
        type: Sequelize.STRING,
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
      daily_context: {
        type: Sequelize.STRING,
      },
      sum_point: {
        type: Sequelize.INTEGER,
      },
      cnt_schedule: {
        type: Sequelize.INTEGER,
      },
      sum_humanity: {
        type: Sequelize.INTEGER,
      },
      sum_illuminance: {
        type: Sequelize.INTEGER,
      },
      sum_noise: {
        type: Sequelize.INTEGER,
      },
      sum_temperature: {
        type: Sequelize.INTEGER,
      },

      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE,
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE,
      // },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("dailies");
  },
};
