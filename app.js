require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const passport = require('./config/passport')
const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize()) 
app.use(routes)

app.listen(port, () => {
  console.info(`App is running on port ${port}.`)
})