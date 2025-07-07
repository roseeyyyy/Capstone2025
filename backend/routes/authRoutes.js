import express from 'express';
const router = express.Router();

// Example hardcoded PINs — later replace this with a MySQL query
const users = [
  { pin: '1234', role: 'admin' },
  { pin: '5678', role: 'staff' },
];

// Login route
router.post('/login', (req, res) => {
  const { pin } = req.body;

  // Validate input
  if (!pin) {
    return res.status(400).json({ error: 'PIN is required' });
  }

  // Check if pin exists
  const user = users.find((u) => u.pin === pin);

  if (!user) {
    return res.status(401).json({ error: 'Invalid PIN' });
  }

  // Return role if valid
  res.json({ role: user.role });
});

export default router;
