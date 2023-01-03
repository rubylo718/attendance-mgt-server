const helpers = require('../_helpers')
const { Record } = require('../models')

const recordController = {
  addRecord: async (req, res) => {
    try {
      const id = helpers.getUser(req).id
      await Record.create({ UserId: id })
      return res.status(200).json({ status: 'success', message: 'New record added' })
    } catch (err) {
      console.log('something went wrong', err)
    }
  },
  getUserRawRecords: async (req, res) => {
    try {
      const id = helpers.getUser(req).id
      const userRawRecords = await Record.findAll({
        where: { UserId: id },
        order: [['createdAt', 'DESC']],
        raw: true,
      })

      return res.status(200).json(userRawRecords)

    } catch (err) {
      console.log('something went wrong', err)
    }
  } 
}

module.exports = recordController