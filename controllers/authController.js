// backend/controllers/authController.js

// Dummy users store
let users = [
  {
    id: 1, firstName: "John", lastName: "Doe",
    email: "patient@test.com", password: "password123",
    role: "patient", phone: "+1 555-0101"
  },
  {
    id: 2, firstName: "Sarah", lastName: "Johnson",
    email: "doctor@test.com", password: "password123",
    role: "doctor", specialty: "Cardiology"
  },
  {
    id: 3, firstName: "Admin", lastName: "User",
    email: "admin@test.com", password: "admin123",
    role: "admin"
  }
];

// POST /api/auth/login
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password are required'
    });
  }

  const user = users.find(u =>
    u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Invalid email or password'
    });
  }

  const { password: _, ...userWithoutPassword } = user;

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: userWithoutPassword,
      token: `dummy-jwt-token-${user.id}-${Date.now()}`
    }
  });
};

// POST /api/auth/register
const register = (req, res) => {
  const { firstName, lastName, email, password, role, phone } = req.body;

  if (!firstName || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'First name, email, and password are required'
    });
  }

  if (users.find(u => u.email === email)) {
    return res.status(409).json({
      success: false,
      error: 'Email already registered'
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      error: 'Password must be at least 8 characters'
    });
  }

  const newUser = {
    id: users.length + 1,
    firstName, lastName, email, password,
    role: role || 'patient',
    phone: phone || null,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  const { password: _, ...userWithoutPassword } = newUser;

  res.status(201).json({
