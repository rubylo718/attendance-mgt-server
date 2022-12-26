const express = require('express')
const router = express.Router()

const recordController = require('../controllers/record-controller')

router.get('/', (req, res) => {
  res.send('hello world')
})

router.post('/check', recordController.addRecord)

module.exports = router