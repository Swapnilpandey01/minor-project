const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Username taken' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const u = new User({ username, passwordHash: hash });
    await u.save();
    return res.json({ message: 'User registered' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const u = await User.findOne({ username });
    if (!u) return res.status(400).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, u.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: u._id, username: u.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, username: u.username });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
