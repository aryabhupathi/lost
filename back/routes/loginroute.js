


const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT
const router = express.Router();
const Login = require('../models/loginModal'); // Assuming you have a correct model path

// Enable CORS
router.use(cors());

// Secret key for JWT signing (store it securely in environment variables)
const JWT_SECRET = 'tryme';

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

// POST route to create a new login (Sign-up)
router.post('/signup', async (req, res) => {
  const { email, password, security } = req.body;

  try {
    const existingUser = await Login.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email must be unique.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newLogin = new Login({
      email,
      password: hashedPassword, // Store hashed password
      security,
    });

    const savedLogin = await newLogin.save();
    res.status(201).json(savedLogin);
  } catch (err) {
    res.status(500).json({ message: `Error saving login: ${err.message}` });
  }
});

// POST route for login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Login.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h', // Token expiry time
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST route to reset the password
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await Login.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found with this email.' });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (err) {
    res.status(500).json({ message: `Error resetting password: ${err.message}` });
  }
});

module.exports = router;
