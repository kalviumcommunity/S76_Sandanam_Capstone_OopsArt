const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  images: [String],
  artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Product', productSchema)
