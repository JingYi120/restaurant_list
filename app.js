const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
const exphbs = require('express-handlebars')
const session = require('express-session')
const usePassport = require('./config/passport')

const routes = require('./routes')
const restaurantList = require('./restaurant.json')

require('./config/mongoose')

//僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(methodOverride('_method'))

usePassport(app)

app.use(flash())

app.use((req, res, next) => {
  // console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})