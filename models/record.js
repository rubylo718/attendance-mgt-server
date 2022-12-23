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
    }
  }, {
    sequelize,
    modelName: 'Record',
    tableName: 'Records'
  })
  return Record
}