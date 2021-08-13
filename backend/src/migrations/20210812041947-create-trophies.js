// npx sequelize model:generate --name trophies --attributes title:string,context:string,is_hidden:boolean,exp:integer,img:string

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trophies', {
      trophy_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      context: {
        type: Sequelize.STRING
      },
      is_hidden: {
        type: Sequelize.BOOLEAN
      },
      exp: {
        type: Sequelize.INTEGER
      },
      img: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('trophies');
  }
};