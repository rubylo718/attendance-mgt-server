'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Records', 'checkIn', {
        type: Sequelize.STRING
      })
    await queryInterface.addColumn('Records', 'checkOut', {
        type: Sequelize.STRING
      })
    await queryInterface.addColumn('Records', 'workday', {
        type: Sequelize.STRING
      })
    await queryInterface.addColumn('Records', 'isHoliday', {
        type: Sequelize.BOOLEAN
      })
    await queryInterface.addColumn('Records', 'isNormal', {
        type: Sequelize.BOOLEAN
      })
    },

  async down (queryInterface) {
    await queryInterface.removeColumn('Records', 'checkIn')
    await queryInterface.removeColumn('Records', 'checkOut')
    await queryInterface.removeColumn('Records', 'workday')
    await queryInterface.removeColumn('Records', 'isHoliday')
    await queryInterface.removeColumn('Records', 'isNormal')
  }
}
