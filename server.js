const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let users = []; // In-memory array

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Add new user
app.post('/api/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json({ message: 'User added', user });
});

// Update user by index
app.put('/api/users/:index', (req, res) => {
  const index = req.params.index;
  users[index] = req.body;
  res.json({ message: 'User updated', user: users[index] });
});

// Delete user by index
app.delete('/api/users/:index', (req, res) => {
  users.splice(req.params.index, 1);
  res.json({ message: 'User deleted' });
});

// Reset all users
app.delete('/api/reset', (req, res) => {
  users = [];
  res.json({ message: 'All users cleared' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
