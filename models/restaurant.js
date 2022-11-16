//定義資料結構
const mongoose = require('mongoose')
// Schema：mongoose提供的定義資料結構的方式
const Schema = mongoose.Schema

// 定義todo裡應該會有什麼資料
const restaurantSchema = new Schema({
  name: { type: String, required: true },
  name_en: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  google_map: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
})

// 匯出，mongoose.model 會複製我們定義的 Schema 並編譯成一個可供操作的 model 物件，匯出的時候我們把這份 model 命名為 Restaurant，以後在其他的檔案直接使用 Restaurant 就可以操作和「待辦事項」有關的資料了
module.exports = mongoose.model('Restaurant', restaurantSchema)