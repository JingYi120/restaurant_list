const bcrypt = require('bcryptjs')
const Restaurant = require("../restaurant")
const restaurantList = require("../../restaurant.json").results
const db = require('../../config/mongoose')
const User = require('../user')

const SEED_USER = [
  {
    name: 'User1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantIndex: [0, 1, 2]
  },
  {
    name: 'User2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantIndex: [3, 4, 5]
  }
]


db.once('open', () => {
  Promise.all(SEED_USER.map((SEED_USER) =>
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash => User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
      }))
      .then(user => {
        const restaurantSeeds = SEED_USER.restaurantIndex.map(index => {
          restaurantList[index].userId = user._id
          return restaurantList[index]
        })
        return Restaurant.create(restaurantSeeds)
      })
  ))
    .then(() => {
      console.log('done.')
      process.exit()
    })
    .catch((error) => console.log(error))
})