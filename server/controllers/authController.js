/*
 * authController.js
 * Purpose: Contains functions for user registration and login.
 */

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

/**
 * Function: registerUser
 * Purpose: Register a new user.
 * Expects: name, email, and password in req.body.
 */
const registerUser = (req, res) => {
  console.log('Inside registerUser, request body:', req.body);
  res.status(200).json({ message: 'User registered successfully (stub)' });
};

/**
 * Function: loginUser
 * Purpose: Authenticate a user and return a token.
 * Expects: email and password in req.body.
 */
const loginUser = (req, res) => {
  console.log('Inside loginUser, request body:', req.body);
  res.status(200).json({ message: 'User logged in successfully (stub)' });
};

module.exports = {
  registerUser,
  loginUser
}; 