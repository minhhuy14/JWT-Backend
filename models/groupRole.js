'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group_Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Group_Role.init({

    groupId: DataTypes.Integer,
    roleId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'GroupRole',
  });
  return Group_Role;
};