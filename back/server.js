// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Initialize express app
// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// // app.use(bodyParser.json());

// app.use(cors());


// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/first_try', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.error('MongoDB connection error:', err));

// // Basic route for root
// app.get('/', (req, res) => {
//   res.send('API is working');
// });

// // Routes
// const formRoutes = require('./routes/routes1');
// app.use('/api/venue', formRoutes);

// // const loginRoutes = require('./routes/loginroute');
// // app.use('/api/userr', loginRoutes);

// // Start server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/first_try', {
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
const loginRoutes = require('./routes/loginroute');
app.use('/api/venue', formRoutes);    // Routes for venues
app.use('/api/userr', loginRoutes);   // Routes for login

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

