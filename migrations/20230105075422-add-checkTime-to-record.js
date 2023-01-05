'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Records', 'checkDate', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('Records', 'checkTime', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('Records', 'workday', {
      type: Sequelize.STRING
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('Records', 'checkDate')
    await queryInterface.removeColumn('Records', 'checkTime')
    await queryInterface.removeColumn('Records', 'workday')
  }
}
