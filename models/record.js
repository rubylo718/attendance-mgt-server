'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    static associate(models) {
      Record.belongsTo(models.User)
    }
  }
  Record.init({
    checkMethod: {
      type: DataTypes.STRING,
      defaultValue: 'webApp'
    },
    checkDate: {
      type: DataTypes.STRING,
      defaultValue: '19800101'
    },
    checkTime: {
      type: DataTypes.STRING,
      defaultValue: '00:00:00'
    },
    workday: {
      type: DataTypes.STRING,
      defaultValue: '19800101'
    }
  }, {
    sequelize,
    modelName: 'Record',
    tableName: 'Records'
  })
  return Record
}