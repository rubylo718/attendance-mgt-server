const express = require('express')
const router = express.Router()

const { authenticated, authUser, authAdmin } = require('../middleware/auth')
const { errorHandler } = require('../middleware/error-handler')

const userController = require('../controllers/user-controller')
const recordController = require('../controllers/record-controller')
const calendarController = require('../controllers/calendar-controller')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

router.get('/users/currentUser', authenticated, userController.getCurrentUser)
router.post('/users/signin', userController.signIn)
router.put('/users/edit', authenticated, authUser, userController.editUser)

router.get('/records/rawRecords', authenticated, authUser, recordController.getUserRecords)

router.post('/check',authenticated, authUser, recordController.addRecord)

router.put('/calendar',authenticated, authAdmin, calendarController.updateCalendar)

router.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

router.use('/', errorHandler)

module.exports = router