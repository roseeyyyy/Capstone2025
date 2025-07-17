import express from 'express';
import db from '../models/db.js';

const router = express.Router();

// Login route using MySQL database
router.post('/login', (req, res) => {
  const { pin } = req.body;

  if (!pin) {
    return res.status(400).json({ error: 'PIN is required' });
  }

  const query = 'SELECT * FROM user WHERE pin = ? LIMIT 1';
  db.query(query, [pin], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid PIN' });
    }

    const user = results[0];

    // Validate against allowed roles
    const validRoles = ['Admin', 'Manager', 'FOH', 'BOH'];
    const role = validRoles.includes(user.role) ? user.role : 'Unknown';

    // Return role if valid
    res.json({
      role: role,
      userId: user.user_id,
      name: `${user.first_name} ${user.last_name}`
    });
  });
});

export default router;
