import express from 'express';
import db from '../models/db.js';

const router = express.Router();

// Login route using MySQL database
router.post('/login', (req, res) => {
  const { pin } = req.body;

  if (!pin) {
    return res.status(400).json({ error: 'PIN is required' });
  }

  const query = 'SELECT * FROM users WHERE pin = ? LIMIT 1';
  db.query(query, [pin], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid PIN' });
    }

    const user = results[0];

    // Return role if valid
    res.json({
      role: user.type === 'Manager' ? 'admin' : 'staff',
      userId: user.id,
      name: user.name
    });
  });
});

export default router;
