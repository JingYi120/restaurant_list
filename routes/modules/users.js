const express = require('express')
const router = express.Router()
const passport = require('passport')

// 登入
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureMessage: true

}))

// 註冊
router.get('/register', (req, res) => {
  res.render('register')
})


module.exports = router