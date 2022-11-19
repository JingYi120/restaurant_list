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

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// // 取得資料庫連線狀態
// const db = mongoose.connection

// // db發生錯誤時，發出提醒
// db.on('error', () => {
//   console.log('mongodb error!')
// })

// // db成功時，會跑出提示，once：這件事只會做一次
// db.once('open', () => {
//   console.log('mongodb connected!')
// })

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// app.get ('/', (req, res) => {
//   Restaurant.find() // 取出 Restaurant model 裡的所有資料
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
//     .catch(error => console.error(error)) // 錯誤處理
//   // res.render('index', { restaurants: restaurantList.results })
// })

// // 新增餐廳頁面
// app.get("/restaurants/new", (req, res) => {
//  return res.render('new')
// })

// // 新增餐廳
// app.post("/restaurants", (req, res) => {
//   return Restaurant.create(req.body)
//     .then(() => res.redirect("/"))
//     .catch(err => console.log(err))
// })

// app.get('/restaurants/:restaurant_id', (req, res) => {
//   const id = req.params.restaurant_id
//   return Restaurant.findById(id)
//     .lean()
//     .then((restaurant) => res.render('show', { restaurant }))
//     .catch(error => console.log(error))

//   // const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)

//   // res.render('show', {restaurant: restaurant})
// })

// app.get('/restaurants/:restaurant_id/edit', (req, res) => {
//   const id = req.params.restaurant_id
//   return Restaurant.findById(id)
//     .lean()
//     .then((restaurant) => res.render('edit', { restaurant }))
//     .catch(error => console.log(error))
// })

// app.put('/restaurants/:restaurant_id', (req, res) => {
//   const id = req.params.restaurant_id
//   const body = req.body
//   // 查詢資料
//   return Restaurant.findById(id)
//     // 如果查詢成功，修改後重新儲存資料
//     .then(restaurant => {
//       restaurant.name = body.name
//       restaurant.name_en = body.name_en
//       restaurant.category = body.category
//       restaurant.image = body.image
//       restaurant.location = body.location
//       restaurant.phone = body.phone
//       restaurant.google_map = body.google_map
//       restaurant.rating = body.rating
//       restaurant.description = body.description
//       return restaurant.save()
//     })

//     .then(() => res.redirect(`/restaurants/${id}`))
//     .catch(error => console.log(error))
// })

// app.delete('/restaurants/:restaurant_id', (req, res) => {
//   const id = req.params.restaurant_id
//   return Restaurant.findById(id)
//     .then(restaurant => restaurant.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// // app.get('/search', (req, res) => {
// //   const restaurants =restaurantList.results.filter( restaurant =>{
// //     return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
// //   })
// //   res.render('index', { restaurants: restaurants, keyword: req.query.keyword})
// // })

// app.get("/search", (req, res) => {
//   if (!req.query.keywords) {
//     res.redirect("/")
//   }
//   const keywords = req.query.keywords
//   const keyword = req.query.keywords.trim().toLowerCase()
  

//   Restaurant.find()
//     .lean()
//     .then(restaurants => {
//       const filterRestaurantsData = restaurants.filter(
//         data =>
//           data.name.toLowerCase().includes(keyword) ||
//           data.category.includes(keyword)
//       )
//       res.render("index", { restaurants: filterRestaurantsData, keywords })
//     })
//     .catch(err => console.log(err))
// })

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})