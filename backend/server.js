import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import leaveRoutes from './routes/leaveRoutes.js'; 
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';  

const app = express();

app.use(cors());
app.use(bodyParser.json());

// API routes
app.use('/api/leaves', leaveRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// default test route
app.get('/', (req, res) => {
  res.send('Leave Form System API Running');
});

// Default fallback if route not found
app.use((req, res) => {
  res.status(404).send('Route not found.');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
