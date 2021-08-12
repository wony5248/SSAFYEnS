'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // M:N 관계
      models.users.belongsToMany(models.groups, {foreignKey:"user_id", through: models.usersmngroups}) 
      models.users.belongsToMany(models.groups, {as:"group_id", foreignKey:"user_id", through: models.applicants}) 
    }
  };
  users.init(
    {
      user_id: {
        type: DataTypes.STRING, 
        primaryKey: true, // Needed for Sequelize id, https://sequelize.org/master/manual/legacy.html
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      password: DataTypes.STRING,
      exp: DataTypes.INTEGER,
      is_admin: DataTypes.BOOLEAN,
    }, {
      sequelize,
      modelName: 'users',
      createdAt: 'created_at', 
      updatedAt: false
    }
  );
  return users;
};