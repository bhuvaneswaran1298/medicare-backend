const express = require('express');
const router = express.Router();

// Dummy login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    res.json({
      success: true,
      message: "Login successful",
      user: {
        email: email,
        role: "patient"
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Email and password required"
    });
  }
});

// Dummy register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  res.json({
    success: true,
    message: "User registered successfully",
    user: { name, email }
  });
});

module.exports = router;
