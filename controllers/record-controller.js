const helpers = require('../_helpers')
const { Record } = require('../models')

const recordController = {
  addRecord: async (req, res) => {
    try {
      const id = helpers.getUser(req).id
      await Record.create({ UserId: id })
      return res.status(200).json({ status: 'success', message: 'New record added' })
    } catch (err) {
      return res.status(400).json({ status: 'error', message: `Failed adding record. ${err}`})
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
      return res.status(400).json({ status: 'error', message: `Failed get user raw records. ${err}`})
    }
  } 
}

module.exports = recordController