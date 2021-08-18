// npx sequelize model:generate --name usersmntrophies --attributes trophy_id:integer,user_id:string

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usersmntrophies', {
      user_id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'user_id',
        }
      },
      trophy_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'trophies',
          key: 'trophy_id',
        }
      },
      achieved_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usersmntrophies');
  }
};