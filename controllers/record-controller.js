const { Record } = require('../models')

const recordController = {
  addRecord: async (req, res) => {
    try {
      await Record.create({ UserId: 2 })
      return res.status(200).json({ status: 'success', message: 'New record added' })
    } catch (err) {
      console.log('something went wrong', err)
    }
  }
}

module.exports = recordController