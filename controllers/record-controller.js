const helpers = require('../_helpers')
const { Record } = require('../models')
const dayjs = require('dayjs')
const { dayCal } = require('../helpers/day-helper')

const recordController = {
  addRecord: async (req, res) => {
    try {
      const nowTime = dayjs(new Date()).format('YYYYMMDD HH:mm:ss')
      const nowWorkday = dayCal.workdayCal(new Date())
      const nowIsHoliday = dayCal.isHoliday(nowWorkday) // 依照工作日看是否為假日
      
      const id = helpers.getUser(req).id
      const workdayRecord = await Record.findOne({ // 本工作日打卡記錄
        where: { UserId: id, workday: nowWorkday}
      })
      
      if (!workdayRecord) { // 本工作日還沒打過卡
        await Record.create({ 
          UserId: id, 
          workday: nowWorkday,
          checkIn: nowTime,
          isHoliday: nowIsHoliday
        })
      } else { // 本工作日已經有一筆以上打卡記錄
        const workHours = dayjs(new Date()).diff(workdayRecord.checkIn, 'hour')
        let isNormal
        if (workdayRecord.isHoliday) {
          isNormal = null
        } else {
          isNormal = (workHours > 9)? true : false
        }
        await Record.update({
          checkOut: nowTime,
          isNormal
        },{
          where: {
            UserId: id,
            workday: nowWorkday
          }
        })
      }
      return res.status(200).json({ status: 'success', message: 'New record added' })
    } catch (err) {
      return res.status(400).json({ status: 'error', message: `Failed adding record. ${err}`})
    }
  },
  getUserRecords: async (req, res) => {
    try {
      const id = helpers.getUser(req).id
      const userRecords = await Record.findAll({
        where: { UserId: id },
        order: [['createdAt', 'DESC']],
        raw: true,
      })
      return res.status(200).json(userRecords)
    } catch (err) {
      return res.status(400).json({ status: 'error', message: `Failed get user records. ${err}`})
    }
  }
}

module.exports = recordController