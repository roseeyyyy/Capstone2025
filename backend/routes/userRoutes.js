import express from 'express';
import db from '../models/db.js';

const router = express.Router();

// Get all users, optionally filtered by role
router.get('/', (req, res) => {
  const { role } = req.query;
  let query = 'SELECT * FROM user';
  const params = [];

  if (role) {
    query += ' WHERE role = ?';
    params.push(role);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err.sqlMessage);
      return res.status(500).json({ error: err.sqlMessage });
    }
    res.json(results);
  });
});

// Get user by id
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM user WHERE user_id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err.sqlMessage);
      return res.status(500).json({ error: err.sqlMessage });
    }
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
});

// Create new user
router.post('/', (req, res) => {
  const { first_name, last_name, role, pin, email, contact_number } = req.body;
  const query = `
    INSERT INTO user (first_name, last_name, role, pin, email, contact_number)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [first_name, last_name, role, pin, email, contact_number],
    (err, result) => {
      if (err) {
        console.error('Error creating user:', err.sqlMessage);
        return res.status(500).json({ error: err.sqlMessage });
      }
      res.status(201).json({ message: 'User created', userId: result.insertId });
    }
  );
});

// ✅ Update existing user by id
router.put('/:id', (req, res) => {
  const { first_name, last_name, role, pin, email, contact_number } = req.body;
  const query = `
    UPDATE user
    SET first_name = ?, last_name = ?, role = ?, pin = ?, email = ?, contact_number = ?
    WHERE user_id = ?
  `;
  db.query(
    query,
    [first_name, last_name, role, pin, email, contact_number, req.params.id],
    (err, result) => {
      if (err) {
        console.error('Error updating user:', err.sqlMessage);
        return res.status(500).json({ error: err.sqlMessage });
      }
      if (result.affectedRows === 0)
        return res.status(404).json({ error: 'User not found' });

      res.json({ message: 'User updated successfully' });
    }
  );
});

export default router;
