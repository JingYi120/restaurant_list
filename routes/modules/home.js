// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id

  Restaurant.find({ userId })
    .lean() 
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
  // res.render('index', { restaurants: restaurantList.results })
})

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