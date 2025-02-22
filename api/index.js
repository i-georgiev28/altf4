const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple GET endpoint for testing
app.get('/', (req, res) => {
  res.send('Hello from Express API!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
