const express = require('express')
const router = express.Router()

// 登入
router.get('/login', (req, res) => {
  res.render('login')
})

// 註冊
router.get('/register', (req, res) => {
  res.render('register')
})


module.exports = router