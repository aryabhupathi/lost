const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Basic route for root
app.get('/', (req, res) => {
  res.send('API is working');
});

// Routes
const formRoutes = require('./routes/routes1');
app.use('/api/venue', formRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
