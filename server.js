const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Assuming 'routes' directory is sibling to 'server.js'
const authRoutes = require('./routes/auth'); // Path to auth.js
const orderRoutes = require('./routes/order'); // <-- NEW: Path to order.js

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins, adjust if needed for production
app.use(bodyParser.json()); // Parse JSON request bodies

// Serve static frontend files from the 'frontend' directory
// Assuming 'backend' and 'frontend' are sibling directories
app.use(express.static('../frontend'));

// API routes
// Mount authentication and contact routes under /api
app.use('/api', authRoutes);
// NEW: Mount order routes under /api/order
app.use('/api/order', orderRoutes);

// Define the port, use environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

