const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = require('../middleware/auth')
const fs = require('fs')
const path = require('path')

// Register
router.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    if (!email || !password || !name) return res.status(400).json({ error: 'Missing fields' })

    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ error: 'Email already in use' })

    const hashed = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashed, role })
    await user.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' })

    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Login
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' })

    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router

// Get current user
router.get('/auth/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update current user (supports bannerBase64 upload or bannerUrl)
router.put('/auth/me', auth, async (req, res) => {
  try {
    const { name, bio, bannerUrl, bannerBase64, avatarUrl, avatarBase64 } = req.body
    const updates = {}
    if (name) updates.name = name
    if (bio) updates.bio = bio
    if (avatarUrl) updates.avatar = avatarUrl

    // Handle base64 banner upload if provided
    if (bannerBase64 && bannerBase64.startsWith('data:')) {
      const matches = bannerBase64.match(/^data:(image\/\w+);base64,(.+)$/)
      if (!matches) return res.status(400).json({ error: 'Invalid image data' })
      const ext = matches[1].split('/')[1]
      const data = matches[2]
      const buffer = Buffer.from(data, 'base64')
      const uploadsDir = path.join(__dirname, '..', 'public', 'uploads')
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
      const filename = `banner-${req.userId}.${ext}`
      const filepath = path.join(uploadsDir, filename)
      fs.writeFileSync(filepath, buffer)
      updates.bannerUrl = `/uploads/${filename}`
    } else if (bannerUrl) {
      updates.bannerUrl = bannerUrl
    }

    // Handle base64 avatar upload if provided
    if (avatarBase64 && avatarBase64.startsWith('data:')) {
      const matches = avatarBase64.match(/^data:(image\/\w+);base64,(.+)$/)
      if (!matches) return res.status(400).json({ error: 'Invalid avatar image data' })
      const ext = matches[1].split('/')[1]
      const data = matches[2]
      const buffer = Buffer.from(data, 'base64')
      const uploadsDir = path.join(__dirname, '..', 'public', 'uploads')
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
      const filename = `avatar-${req.userId}.${ext}`
      const filepath = path.join(uploadsDir, filename)
      fs.writeFileSync(filepath, buffer)
      updates.avatar = `/uploads/${filename}`
    } else if (avatarUrl) {
      updates.avatar = avatarUrl
    }

    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password')
    res.json({ user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
