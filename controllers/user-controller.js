const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const userController = {
  signIn: async (req, res, next) => {
    try {
      const { account, password } = req.body

      if (!account?.trim() || !password.trim()) {
        return res.status(400).json({
          status: 'error',
          message: 'Please enter your account and password.'
        })
      }

      const user = await User.findOne({
        raw: true, 
        where: { account }
      })

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User is not existed.'
        })
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({
          status: 'error',
          message: 'Password incorrect.'
        })
      }

      const payload = { id: user.id }
      const token = jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: '1d'
      })
      delete user.password
      res.json({
        status: 'success',
        data: { token, user }
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController