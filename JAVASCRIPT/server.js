// server.js

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // ✅ parses incoming JSON

// DB Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'restaurant_db'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL');
});

// Reservation route
app.post('/reserve', (req, res) => {
  console.log("🧠 Received reservation:", req.body);
  const { name, email, date, time, guests } = req.body;

  const sql = 'INSERT INTO reservations (name, email, date, time, guests) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, date, time, guests], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error: ' + err.message });
    }
    res.json({ message: 'Reservation saved successfully!' });
  });
});

// Contact route
app.post('/contact', (req, res) => {
  console.log("📨 Contact form data:", req.body);
  const { contactName, contactEmail, message } = req.body;

  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [contactName, contactEmail, message], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error: ' + err.message });
    }
    res.json({ message: `Thank you, ${contactName}. We’ll get back to you.` });
  });
});

app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
