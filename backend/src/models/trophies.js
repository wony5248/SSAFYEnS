// npx sequelize model:generate --name trophies --attributes title:string,context:string,is_hidden:boolean,exp:integer,img:string

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trophies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // M:N 관계
      models.trophies.belongsToMany(models.users, {foreignKey:"trophy_id", through: models.usersmntrophies}) 
    }
  };
  trophies.init({
    trophy_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true, // Needed for Sequelize id, https://sequelize.org/master/manual/legacy.html
    },
    title: DataTypes.STRING,
    context: DataTypes.STRING,
    is_hidden: DataTypes.BOOLEAN,
    exp: DataTypes.INTEGER,
    img: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'trophies',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return trophies;
};