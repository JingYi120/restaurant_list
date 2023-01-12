const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

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

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  //有一項不存在的話，會跳出訊息
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '除了名字，其他欄位都是必填。' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符!' })
  }

  // 若errors有東西
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  // 使用email去找是否有註冊過
  User.findOne({ email })
    // 如果有找到，會拿到一個user
    .then(user => {
      if (user) {
        // console.log('User already exists.')
        errors.push({ message: '這個Email已經註冊過了' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }

      return bcrypt
        .genSalt(10)
        .then(salt =>
          bcrypt.hash(password, salt)
        )
        .then(hash =>
          User.create({
            name,
            email,
            password: hash
          }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router