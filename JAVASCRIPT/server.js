const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// 🧼 Clean CORS setup
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500']
}));


// 👂 Body parser
app.use(bodyParser.json());

// ✅ MySQL connection
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

// 🛠 Reservation route
app.post('/reserve', (req, res) => {
  const { name, email, date, time, guests } = req.body;
  console.log("🧠 Reservation received:", req.body);

  // Defensive logging
  console.log("🛠 Prepared for DB:", [name, email, date, time, guests]);

  // Convert guests to integer
  const guestCount = parseInt(guests);

  if (isNaN(guestCount)) {
    return res.status(400).json({ message: 'Guests must be a number' });
  }

  const sql = 'INSERT INTO reservations (name, email, date, time, guests) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, date, time, guestCount], (err, result) => {
    if (err) {
      console.error('❌ DB Error:', err.message);
      return res.status(500).json({ message: 'Database error: ' + err.message });
    }
    res.json({ message: '✅ Reservation saved successfully!' });
  });
});

// 📬 Contact route
app.post('/contact', (req, res) => {
  const { contactName, contactEmail, contactMessage } = req.body;
  console.log("📨 Contact form received:", req.body);

  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [contactName, contactEmail, contactMessage], (err, result) => {
    if (err) {
      console.error('❌ DB Error:', err.message);
      return res.status(500).json({ message: 'Database error: ' + err.message });
    }
    res.json({ message: `📬 Thank you, ${contactName}. We’ll get back to you.` });
  });
});

app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});