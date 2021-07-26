'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      schedule_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      title: {
        type: Sequelize.STRING
      },
      context: {
        type: Sequelize.STRING
      },
      started_at: {
        type: Sequelize.DATE
      },
      finished_at: {
        type: Sequelize.DATE
      },
      deadline_at: {
        type: Sequelize.DATE
      },
      point: {
        type: Sequelize.INTEGER
      },
      is_finixhed: {
        type: Sequelize.BOOLEAN
      },
      notification: {
        type: Sequelize.DATE
      },
      noti_extend: {
        type: Sequelize.INTEGER
      },
      challenge_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('schedules');
  }
};