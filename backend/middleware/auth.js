const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ error: 'Missing Authorization header' })

  const token = header.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Invalid Authorization header' })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
    req.userId = payload.id
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = auth
