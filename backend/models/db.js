import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rose1201',
  database: 'leaveformsystem'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

export default db;
