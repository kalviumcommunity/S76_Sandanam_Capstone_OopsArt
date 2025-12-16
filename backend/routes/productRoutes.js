const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const auth = require('../middleware/auth')

// Create product (protected)
router.post('/products', auth, async (req, res) => {
  try {
    const p = new Product({ ...req.body, artistId: req.userId })
    await p.save()
    res.status(201).json(p)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Read all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update product (protected)
router.put('/products/:id', auth, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Delete product (protected)
router.delete('/products/:id', auth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
