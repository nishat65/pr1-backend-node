const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('./model');

const router = express.Router();

router.route('/sign-up').get(async (req, res) => {
  const { username, password } = req.body;
  try {
    const hasUser = await User.findOne({ username });
    if (hasUser)
      return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ username, password });
    const payload = jwt.sign({ user: user.username }, process.env.JWT, {
      expiresIn: 3600,
    });
    return res.status(201).json({
      message: 'User created successfully',
      token: payload,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

module.exports = router;
