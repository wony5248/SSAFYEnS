"use strict";

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("schedules", {
      schedule_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      //date
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      week: Sequelize.STRING,
      month: Sequelize.STRING,
      year: Sequelize.STRING,

      //information
      title: {
        type: Sequelize.STRING,
      },
      context: {
        type: Sequelize.STRING,
      },

      //time
      expectstart_at: Sequelize.DATE,
      started_at: Sequelize.DATE,
      finished_at: Sequelize.DATE,
      deadline_at: Sequelize.DATE,
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(`CURRENT_TIMESTAMP`),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(`CURRENT_TIMESTAMP`),
      },

      is_finished: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      point: {
        type: Sequelize.INTEGER,
      },

      //notification
      notification: {
        type: Sequelize.BOOLEAN,
      },
      notificationtime: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      noti_extend: Sequelize.INTEGER,

      //environment
      humidity: Sequelize.INTEGER,
      illuminance: Sequelize.INTEGER,
      noise: Sequelize.INTEGER,
      temperature: Sequelize.INTEGER,

      challenge_id: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("schedules");
  },
};
