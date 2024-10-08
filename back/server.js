

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/first_try', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Start the server
const startServer = () => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

// Basic route for root
app.get('/', (req, res) => {
  res.send('API is working');
});

// Routes
const formRoutes = require('./routes/routes1');
const loginRoutes = require('./routes/loginroute');
app.use('/api/venue', formRoutes); // Routes for venues
app.use('/api/userr', loginRoutes); // Routes for login

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack trace
  res.status(500).json({ message: 'Internal Server Error' }); // Send a generic error response
});

// Graceful shutdown
const gracefulShutdown = () => {
  console.log('Shutting down gracefully...');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
};

// Catch termination signals for graceful shutdown
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Connect to MongoDB and start the server
connectToDatabase().then(startServer);
