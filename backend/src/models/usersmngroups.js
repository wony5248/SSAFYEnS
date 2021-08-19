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

      // belongsToMany에서만 하고 여기 junction model에서는 안 하는 것 같다
      // models.usersmngroups.hasMany(models.groups)
      // models.usersmngroups.hasMany(models.users)
    }
  };
  usersmngroups.init({
    group_id: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
      references: {
        model: 'groups',
        key: 'group_id',
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id',
      }
    },
    is_group_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'usersmngroups',
    createdAt: 'joined_at',
    updatedAt: false
  });
  return usersmngroups;
};