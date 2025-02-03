const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

console.log('authRoutes loaded');

// Updated route for registering a new user with logging
router.post('/register', (req, res) => {
  console.log('Test for /api/auth/register route reached, request body:', req.body);
  res.status(200).json({ message: 'Test response from /api/auth/register' });
});

// Route for logging in an existing user
router.post('/login', (req, res, next) => {
  console.log('POST /api/auth/login endpoint reached, request body:', req.body);
  return loginUser(req, res, next);
});

module.exports = router; 