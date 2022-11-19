// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Restaurant = require('../../models/restaurant')

// 定義首頁路由
router.get('/', (req, res) => {
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
  // res.render('index', { restaurants: restaurantList.results })
})

// app.get('/search', (req, res) => {
//   const restaurants =restaurantList.results.filter( restaurant =>{
//     return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
//   })
//   res.render('index', { restaurants: restaurants, keyword: req.query.keyword})
// })

router.get("/search", (req, res) => {
  if (!req.query.keywords) {
    res.redirect("/")
  }
  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filterRestaurantsData = restaurants.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render("index", { restaurants: filterRestaurantsData, keywords })
    })
    .catch(err => console.log(err))
})

// 匯出路由模組
module.exports = router