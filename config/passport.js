const passport = require('passport')

const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const { User } = require('../models')

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  // passReqToCallback: true
}

passport.use(new JwtStrategy(jwtOptions, async (payload, next) => {
  try {
    const user = await User.findByPk(payload.id, {
      attributes: { excluded: ['password'] }
    })
    if (!user) return next(null, false)
    return next(null, user)
  } catch (err) {
    next(err)
  }
}))

module.exports = passport