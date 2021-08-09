// npx sequelize model:generate --name usersmngroups --attributes group_id:integer,user_id:string,is_group_admin:boolean

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersmngroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.usersmngroups.hasMany(models.groups)
    }
  };
  usersmngroups.init({
    group_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'groups',
        key: 'group_id',
      }
    },
    user_id: {
      type: Sequelize.STRING,
      references: {
        model: 'users',
        key: 'user_id',
      }
    },
    is_group_admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'usersmngroups',
    createdAt: 'joined_at',
    updatedAt: false
  });
  return usersmngroups;
};