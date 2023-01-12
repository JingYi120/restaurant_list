const express = require('express')
// const mongoose = require('mongoose')
// const Restaurant = require('./models/restaurant')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
// 引用路由器
const routes = require('./routes')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

require('./config/mongoose')

//僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})