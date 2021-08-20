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

      // 1:N 관계
      models.groups.hasMany(models.challenges, { foreignKey: 'group_id'}) // https://sequelize.org/master/manual/assocs.html#customizing-the-foreign-key
      

      // M:N 관계
      models.groups.belongsToMany(models.users, {foreignKey:"group_id",through: models.usersmngroups })
      models.groups.belongsToMany(models.users, {as: "user_id", foreignKey:"group_id",through: models.applicants })
    }
  };
  groups.init({
    group_id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true, // Needed for Sequelize id, https://sequelize.org/master/manual/legacy.html
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    context: DataTypes.STRING,
    // pax: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 1,
    // },
    ranking: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'groups',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return groups;
};