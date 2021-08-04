'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('monthlies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      month: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      avgpoint: {
        type: Sequelize.STRING
      },
      avgpoint: {
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
    await queryInterface.dropTable('monthlies');
  }
};