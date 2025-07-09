import express from 'express';
const router = express.Router();

// Dummy user data for now — replace with MySQL calls later
let users = [
  { id: 1, name: 'Rose', type: 'Manager', email: 'rose@gmail.com', number: '123456789', pin: '1234' },
  { id: 2, name: 'Alex', type: 'FOH', pin: '5678' },
  { id: 3, name: 'Mika', type: 'BOH', pin: '9876' },
];

// Get all users
router.get('/', (req, res) => {
  const { type } = req.query;
  if (type) {
    const filtered = users.filter(u => u.type === type);
    return res.json(filtered);
  }
  res.json(users);
});

// Get user by id
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Create new user
router.post('/', (req, res) => {
  const { name, type, email, number, pin } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    type,
    email,
    number,
    pin
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;
