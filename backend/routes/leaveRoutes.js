import express from 'express';
const router = express.Router();
import db from '../models/db.js';

// Get request by ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM leaves WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) res.status(500).json({ error: err });
    else res.json(results[0]);
  });
});

// Update status
router.put('/:id', (req, res) => {
  const query = 'UPDATE leaves SET status = ? WHERE id = ?';
  db.query(query, [req.body.status, req.params.id], (err, result) => {
    if (err) res.status(500).json({ error: err });
    else res.json({ message: 'Status updated' });
  });
});

export default router;