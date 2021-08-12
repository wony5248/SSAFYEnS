// npx sequelize model:generate --name applicants --attributes group_id:integer,user_id:string,reason:string

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class applicants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  applicants.init({
    group_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'groups',
        key: 'group_id',
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id',
      }
    },
    reason: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'applicants',
    createdAt: 'applied_at',
    updatedAt: false,
  });
  return applicants;
};