const express = require('express');
const router = express.Router();
const Item = require('../models/item');

const auth = require('../middleware/auth')

// Create an Item (protected)
router.post('/items', auth, async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }    
});

// ✅ Update an Item by ID (protected)
router.put('/items/:id', auth, async (req, res) => {
  try {
    const updatedData = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Delete an Item by ID (protected)
router.delete('/items/:id', auth, async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
