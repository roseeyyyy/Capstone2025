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

// Submit new leave request (for my LeaveForm.js form)
router.post('/', (req, res) => {
  const { type, startDate, endDate, reason } = req.body;

  const query = 'INSERT INTO leaves (type, start_date, end_date, reason, status) VALUES (?, ?, ?, ?, ?)';
  const values = [type, startDate, endDate, reason, 'Pending'];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Failed to insert leave:', err);
      res.status(500).json({ error: 'Failed to submit leave request.' });
    } else {
      res.status(201).json({ message: 'Leave request submitted successfully.', leaveId: result.insertId });
    }
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