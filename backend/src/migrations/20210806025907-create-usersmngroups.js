// npx sequelize model:generate --name usersmngroups --attributes group_id:integer,user_id:string,is_group_admin:boolean

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usersmngroups', {
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
      is_group_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      joined_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usersmngroups');
  }
};