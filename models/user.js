'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Record, { foreignKey: 'UserId' })
    }
  }
  User.init({
    employeeId: DataTypes.STRING,
    name: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordWrongTimes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isLocked: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  })
  return User
}