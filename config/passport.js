const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  // 登入的驗證機制
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        // 使用者不存在
        if (!user) {
          return done(null, false, req.flash('warning_msg', 'That email is not registered!'))
        }

        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('warning_msg', 'Email or Password incorrect.'))
            }
            // 登入成功
            return done(null, user)
          })
      })
      .catch(err => done(err, false))
  }))

  
  // 序列化
  passport.serializeUser((user, done) => {
    // console.log(user)
    done(null, user.id)
  })

  // 反序列化
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })

}