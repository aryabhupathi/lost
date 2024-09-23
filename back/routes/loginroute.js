const express = require('express');
const router = express.Router();
const Login = require('../models/loginModal');

// GET route to fetch all logins
router.get('/', async (req, res) => {
  try {
    const logins = await Login.find();
    if (logins.length === 0) {
      return res.status(404).json({ message: 'No logins found.' });
    }
    res.json(logins);
  } catch (err) {
    res.status(500).json({ message: `Error fetching logins: ${err.message}` });
  }
});

// POST route to create a new login
router.post('/', async (req, res) => {
  const { email, password, security } = req.body;

  const newLogin = new Login({
    email,
    password,
    security
  });

  try {
    const savedLogin = await newLogin.save();
    res.status(201).json(savedLogin);
  } catch (err) {
    if (err.code === 11000) { // Duplicate email error
      return res.status(400).json({ message: 'Email must be unique.' });
    }
    console.error('Error saving login:', err);
    res.status(500).json({ message: `Error saving login: ${err.message}` });
  }
});

module.exports = router;
