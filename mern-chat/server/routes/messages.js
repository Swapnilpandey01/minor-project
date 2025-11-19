const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// GET last 100 messages
router.get('/', async (req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: 1 }).limit(100);
    res.json(msgs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
