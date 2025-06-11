const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',              // ✅ replace with your MySQL username
  password: 'akhila9705', // ✅ replace with your MySQL password
  database: 'coffee_shop'
});

db.connect((err) => {
  if (err) {
    console.error('DB connection error:', err);
    return;
  }
  console.log('MySQL connected!');
});

module.exports = db;