const express = require('express')
const router = express.Router()

const { authenticated, authUser } = require('../middleware/auth')

const userController = require('../controllers/user-controller')
const recordController = require('../controllers/record-controller')

router.get('/', authenticated, authUser, (req, res) => {
  res.send('hello world')
})

router.get('/users/currentUser', authenticated, userController.getCurrentUser)
router.post('/users/signin', userController.signIn)
router.post('/check',authenticated, authUser, recordController.addRecord)

module.exports = router