import express from 'express';
import db from '../models/db.js';
const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  const { type } = req.query;
  let query = 'SELECT * FROM users';
  const params = [];

  if (type) {
    query += ' WHERE type = ?';
    params.push(type);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get user by id
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Create new user
router.post('/', (req, res) => {
  const { name, type, pin, email, contact_number } = req.body;
  const query = 'INSERT INTO users (name, type, pin, email, contact_number) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, type, pin, email, contact_number], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'User created', userId: result.insertId });
  });
});


export default router;
