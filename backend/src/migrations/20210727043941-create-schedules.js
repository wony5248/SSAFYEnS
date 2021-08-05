"use strict";

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("schedules", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      month: Sequelize.STRING,
      year: Sequelize.STRING,
      week: Sequelize.STRING,
      user_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      title: {
        type: Sequelize.STRING,
      },
      context: {
        type: Sequelize.STRING,
      },
      started_at: {
        type: Sequelize.DATE,
      },
      finished_at: {
        type: Sequelize.DATE,
      },
      deadline_at: {
        type: Sequelize.DATE,
      },
      point: {
        type: Sequelize.INTEGER,
      },
      is_finished: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      notification: {
        type: Sequelize.DATE,
      },
      noti_extend: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      challenge_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(`CURRENT_TIMESTAMP`),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(`CURRENT_TIMESTAMP`),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("schedules");
  },
};
