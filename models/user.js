const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  // 甚麼時候註冊的?
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)