'use strict'
const faker = require('faker')
const dayjs = require('dayjs')
const { dayCal } = require('../helpers/day-helper')
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
      const userRecords = Array.from({ length: 6}, () => ({
        UserId: user.id,
        checkMethod: 'webApp',
        createdAt: faker.date.recent(4),
        updatedAt: new Date()
      }))
      seedRecords.push(...userRecords)
    })
    const newRecords = seedRecords.map(record => ({
      ...record, 
      checkDate: dayjs(record.createdAt).format('YYYYMMDD'),
      checkTime: dayjs(record.createdAt).format('HH:mm:ss'),
      workday: dayCal.workdayCal(dayjs(record.createdAt))
    }))
    await queryInterface.bulkInsert('Records', newRecords)
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Records', null, {})
  }
}
