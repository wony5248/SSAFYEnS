"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("yearlies", {
      yearly_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      year: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.STRING,
      },

      //statics
      cnt_schedule: Sequelize.INTEGER,
      sum_point: Sequelize.INTEGER,

      //environment 추가
      sum_humidity: Sequelize.INTEGER,
      sum_illuminance: Sequelize.INTEGER,
      sum_noise: Sequelize.INTEGER,
      sum_temperature: Sequelize.INTEGER,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("yearlies");
  },
};
