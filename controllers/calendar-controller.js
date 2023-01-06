const calendarRequest = require('../config/api')
const { appendFile } = require('node:fs')

const calendarController =  {
  updateCalendar: async (req, res, next) => {
    try {
      const calendar = await calendarRequest.get('/2023.json').then(res => {
        const data = JSON.stringify(res.data)
        return data
      })
      appendFile('calendar2023.json', calendar, (err) => {
        if (err) { 
          return res.status(400).json({ status: 'error', message: 'appendFile failed'})
        } else {
          return res.status(200).json({ status: 'success', message: 'update calendar.json successfully'})
        }
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = calendarController