// npx sequelize model:generate --name applicants --attributes group_id:integer,user_id:string,reason:string

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('applicants', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      group_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'groups',
          key: 'group_id',
        }
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'user_id',
        }
      },
      reason: {
        type: Sequelize.STRING
      },
      applied_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('applicants');
  }
};