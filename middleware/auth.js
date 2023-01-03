const passport = require('../config/passport')
const helpers = require('../_helpers')

const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false}, (err, user) => {
    if (err || !user) return res.status(401).json({ status: 'error', message: 'Unauthorized.' })
    if (user) req.user = user
    next()
  })(req, res, next)
}

const authUser = (req, res, next) => {
  if (!helpers.getUser(req)?.isAdmin) {
    return next()
  } else {
    return res.status(403).json({
      status: 'error',
      message: 'Permission denied. Only users can access.'
    })
  }
}

const authAdmin = (req, res, next) => {
  if (helpers.getUser(req)?.isAdmin) {
    return next()
  } else {
    return res.status(403).json({
      status: 'error',
      message: 'Permission denied. Only Admin can access.'
    })
  }
}

module.exports = {
  authenticated,
  authUser,
  authAdmin
}
