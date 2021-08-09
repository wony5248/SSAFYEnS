// npx sequelize model:generate --name groups --attributes group_id:integer,name:string,context:string,pax:integer,ranking:integer

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // M:N 관계
      models.groups.belongsToMany(models.users, { through: models.usersmngroups })
    }
  };
  groups.init({
    group_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    context: DataTypes.STRING,
    pax: DataTypes.INTEGER,
    ranking: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'groups',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return groups;
};