// npx sequelize model:generate --name challenges --attributes challenge_id:integer,group_id:integer,name:string,content:string

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class challenges extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // models.challenges.hasMany(models.schedules, { foreignKey: 'challenge_id'}) // https://sequelize.org/master/manual/assocs.html#customizing-the-foreign-key

      models.challenges.belongsTo(models.groups, { foreignKey: 'group_id' }) // https://sequelize.org/master/manual/assocs.html#customizing-the-foreign-key
    }
  };
  challenges.init({
    challenge_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true, // Needed for Sequelize id, https://sequelize.org/master/manual/legacy.html
    },
    group_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'challenges',
    createdAt: 'created_at',
    updatedAt: false,
  });
  return challenges;
};