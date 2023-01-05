const dayjs = require('dayjs')
const calendarData = require('../calendar2023.json')
 
const dayCal = {
  workdayCal: (date) => {
    let workday
    const isBeforeDayChange = dayjs(date).isBefore(dayjs(date).format('YYYYMMDD 05:00:00'))
    if (isBeforeDayChange) {
      workday = dayjs(date).subtract(1, 'day').format('YYYYMMDD')
    } else {
      workday = dayjs(date).format('YYYYMMDD')
    }
    return workday
  },
  isHoliday: (workday) => { // 20230101
    for (const item of calendarData) {
      if (item.date === workday) {
        return item.isHoliday
      }
    }
  }
}

module.exports = {
  dayCal
}
