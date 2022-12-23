'use strict'
const bcrypt = require('bcryptjs')
const faker = require('faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    // create 1 admin account and 5 employeeId 1001 to 1005
    const users = []
    for (let i = 0; i < 5; i++) {
      users.push({
        account: `100${i + 1}`,
        name: faker.lorem.words(2),
        password: bcrypt.hashSync('titaner', 10),
        passwordWrongTimes: 0,
        isAdmin: false,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Users', [
      {
        account: 'admin',
        name: 'admin',
        password: bcrypt.hashSync('tiadmin', 10),
        passwordWrongTimes: 0,
        isAdmin: true,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }, ...users])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Users', {}, {})
  }
}
