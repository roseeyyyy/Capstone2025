import express from 'express';
const router = express.Router();
import db from '../models/db.js';

// Get all leaves for a staff member (any status)
router.get('/role/:user_id', (req, res) => {
  const { user_id } = req.params;
  const query = 'SELECT * FROM leave_request WHERE user_id = ?';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching leave records:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Get leave history (approved or disapproved only) for a staff member
router.get('/history/:user_id', (req, res) => {
  const { user_id } = req.params;
  const query = `
    SELECT 
      request_id,
      user_id,
      leave_type,
      start_date,
      end_date,
      reason,
      leave_status,
      created_at
    FROM leave_request
    WHERE user_id = ?
      AND leave_status IN ('approved', 'disapproved')
    ORDER BY created_at DESC`;
  
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching leave history:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Admin route - Get leave history for ALL users
router.get('/history', (req, res) => {
  const query = `
    SELECT 
      request_id,
      user_id,
      leave_type,
      start_date,
      end_date,
      reason,
      leave_status,
      created_at
    FROM leave_request
    WHERE leave_status IN ('approved', 'disapproved')
    ORDER BY created_at DESC`;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching admin leave history:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Get approved leaves only (for leave balance calculation)
router.get('/staff/:user_id', (req, res) => {
  const { user_id } = req.params;
  const query = `
    SELECT 
      leave_type, 
      start_date, 
      end_date, 
      leave_status
    FROM leave_request
    WHERE user_id = ? 
      AND leave_status = 'approved'
  `;
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching approved leaves:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Leave balance endpoint
router.get('/:id/balance', (req, res) => {
  const userId = req.params.id;
  const query = `
    SELECT 
      annual_leave_entitlement,
      sick_leave_entitlement,
      lieu_entitlement,
      used_annual,
      used_sick,
      used_lieu,
      used_unpaid
    FROM employee_leave 
    WHERE user_id = ?
  `;
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error retrieving balance data:', err);
      return res.status(500).json({ error: 'Failed to retrieve database record.' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'No leave record found for this user.' });
    }
    res.json({ data: result[0] });
  });
});

// Get leave request by ID with employee name
router.get('/:id', (req, res) => {
  const query = `
    SELECT 
      lr.*, 
      u.user_id,
      u.first_name, 
      u.last_name
    FROM leave_request lr
    JOIN user u ON lr.user_id = u.user_id
    WHERE lr.request_id = ?
  `;
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error fetching leave request details:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Leave request not found' });
    }
    res.json(results[0]);
  });
});

// Get all leave requests (for admin/staff dashboard)
router.get('/', (req, res) => {
  const query = `
    SELECT 
      lr.request_id AS id,
      u.first_name,
      u.last_name,
      lr.leave_type,
      lr.leave_status
    FROM leave_request lr
    JOIN user u ON lr.user_id = u.user_id
    ORDER BY lr.created_at DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching leave requests:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Submit a new leave request
router.post('/', (req, res) => {
  const { userId, type, startDate, endDate, reason } = req.body;
  const query = 'INSERT INTO leave_request (user_id, leave_type, start_date, end_date, reason, leave_status) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [userId, type, startDate, endDate, reason, 'pending'];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Failed to insert leave:', err);
      return res.status(500).json({ error: 'Failed to submit leave request.' });
    }
    res.status(201).json({ message: 'Leave request submitted successfully.', leaveId: result.insertId });
  });
});

// Update leave status and update used leave balances if approved
router.put('/:id', (req, res) => {
  const leaveId = req.params.id;
  const newStatus = req.body.status;

  // Update leave_request status
  const updateStatusQuery = 'UPDATE leave_request SET leave_status = ? WHERE request_id = ?';
  db.query(updateStatusQuery, [newStatus, leaveId], (err) => {
    if (err) {
      console.error('Error updating leave status:', err);
      return res.status(500).json({ error: 'Failed to update status.' });
    }

    if (newStatus === 'approved') {
      // Fetch leave request details
      const selectLeaveQuery = 'SELECT * FROM leave_request WHERE request_id = ?';
      db.query(selectLeaveQuery, [leaveId], (err, results) => {
        if (err || results.length === 0) {
          console.error('Error fetching leave request details:', err);
          return res.status(500).json({ error: 'Failed to get leave request details.' });
        }

        const leave = results[0];
        const start = new Date(leave.start_date);
        const end = new Date(leave.end_date);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

        const leaveType = leave.leave_type.toLowerCase(); // annual, sick, lieu
        const userId = leave.user_id;

        // Fetch current leave balance
        const selectBalanceQuery = 'SELECT * FROM employee_leave WHERE user_id = ?';
        db.query(selectBalanceQuery, [userId], (err, balanceResults) => {
          if (err || balanceResults.length === 0) {
            console.error('Error fetching leave balance:', err);
            return res.status(500).json({ error: 'Failed to get leave balance' });
          }

          const balance = balanceResults[0];

          // Determine fields and remaining entitlement
          let remainingEntitlement = 0;
          let usedField = '';

          if (leaveType === 'annual') {
            remainingEntitlement = balance.annual_leave_entitlement - balance.used_annual;
            usedField = 'used_annual';
          } else if (leaveType === 'sick') {
            remainingEntitlement = balance.sick_leave_entitlement - balance.used_sick;
            usedField = 'used_sick';
          } else if (leaveType === 'lieu') {
            remainingEntitlement = balance.lieu_entitlement - balance.used_lieu;
            usedField = 'used_lieu';
          } else {
            return res.status(400).json({ error: 'Invalid leave type' });
          }

          let unpaidDays = 0;
          let usedDays = 0;

          if (remainingEntitlement >= days) {
            usedDays = days;
          } else {
            usedDays = remainingEntitlement > 0 ? remainingEntitlement : 0;
            unpaidDays = days - usedDays;
          }

          // Update employee_leave used leave and unpaid leave
          const updateBalanceQuery = `
            UPDATE employee_leave 
            SET ${usedField} = ${usedField} + ?, used_unpaid = used_unpaid + ? 
            WHERE user_id = ?
          `;

          db.query(updateBalanceQuery, [usedDays, unpaidDays, userId], (err) => {
            if (err) {
              console.error('Error updating leave balance:', err);
              return res.status(500).json({ error: 'Failed to update leave balance' });
            }
            res.json({ message: 'Status updated and leave balance adjusted' });
          });
        });
      });
    } else {
      // For other statuses (pending, disapproved, etc) just update status
      res.json({ message: 'Status updated' });
    }
  });
});



export default router;
