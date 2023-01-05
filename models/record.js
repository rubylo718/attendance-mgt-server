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
    workday: {
      type: DataTypes.STRING,
      defaultValue: '19800101'
    },
    checkIn: {
      type: DataTypes.STRING
    },
    checkOut: {
      type: DataTypes.STRING,
      defaultValue: '19800101 00:00:00'
    }, 
    isHoliday: {
      type: DataTypes.BOOLEAN
    },
    isNormal: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Record',
    tableName: 'Records'
  })
  return Record
}