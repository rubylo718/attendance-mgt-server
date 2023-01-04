const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const helpers = require('../_helpers')
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
  },
  getCurrentUser: async (req, res) => {
    const id = helpers.getUser(req).id
    const user = await User.findByPk(id, {
      attributes: ['id', 'account', 'name', 'isAdmin', 'isLocked']
    })
    if (!user) return res.json({ status: 'error', message: 'user not found' })
    return res.json(user)
  },
  editUser: async (req, res, next) => {
    try {
      // get the user instance (full data, including hashing password)
      const id = helpers.getUser(req).id
      const user = await User.findByPk(id)

      let { password, checkPassword } = req.body
      password = password?.trim()
      checkPassword = checkPassword?.trim()

      if (password !== checkPassword) {
        return res.status(401).json({status: 'error', message: 'Password and checkPassword are not same.'})
      }

      const updatedUser = await user.update({
        password: password ? bcrypt.hashSync(password, 10) : user.password
      })

      const data = updatedUser.toJSON()
      delete data.password
      return res.status(200).json(data)
    } catch(err) {
      next(err)
   }
  }
}

module.exports = userController
