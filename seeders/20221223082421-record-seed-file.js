'use strict'
const faker = require('faker')
const { User } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const users = await User.findAll({
      where: { isAdmin: false }, 
      attributes: ['id'], 
      raw: true 
    })
    
    const seedRecords = []
    users.forEach(user => {
      const userRecords = Array.from({ length: 10}, () => ({
        UserId: user.id,
        checkMethod: 'webApp',
        createdAt: faker.date.recent(7),
        updatedAt: new Date()
      }))
      seedRecords.push(...userRecords)
    })
    await queryInterface.bulkInsert('Records', seedRecords)
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Records', null, {})
  }
}
