// npx sequelize model:generate --name usersmntrophies --attributes trophy_id:integer,user_id:string

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersmntrophies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  usersmntrophies.init({
    trophy_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'trophies',
        key: 'trophy_id',
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id',
      }
    },
  }, {
    sequelize,
    modelName: 'usersmntrophies',
    createdAt: 'achieved_at',
    updatedAt: false,
  });
  return usersmntrophies;
};