"use strict";
const { Model } = require("sequelize");
const { user_id } = require("../validation/averageValidation");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
<<<<<<< HEAD
      models.users.belongsTo(models.users, { foreignKey: user_id });
=======

      // M:N 관계
      models.users.belongsToMany(models.groups, {foreignKey:"user_id", through: models.usersmngroups}) 
>>>>>>> backend
    }
  }
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
    },
    {
      sequelize,
<<<<<<< HEAD
      modelName: "users",
      createdAt: "created_at",
      updatedAt: false,
=======
      modelName: 'users',
      createdAt: 'created_at', 
      updatedAt: false
>>>>>>> backend
    }
  );
  return users;
};
