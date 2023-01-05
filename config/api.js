const axios = require('axios')

const calendarRequest = axios.create({
  // refers to https://github.com/ruyut/TaiwanCalendar
  baseURL: 'https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data'
})

module.exports = calendarRequest