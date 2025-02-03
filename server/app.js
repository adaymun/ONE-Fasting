/*
 * app.js
 * Purpose: Main file to initialize and run the Express server for ONE - Intermittent Fasting project.
 */

// Load necessary packages
const express = require('express'); // Express framework for building web applications
const dotenv = require('dotenv');   // Environment variable management
const path = require('path');       // Module to work with file paths
const connectDB = require('./config/db'); // Database connection function

// Configure environment variables from the .env file at the project root using __dirname and override existing variables
dotenv.config({ path: path.join(__dirname, '../.env'), override: true });

// Force override PORT if it is set to 5000 or 3000, to avoid conflicts with the React frontend
if(process.env.PORT === "5000" || process.env.PORT === "3000") {
  console.log(`Force overriding PORT from ${process.env.PORT} to 5001 because of conflict.`);
  process.env.PORT = "5001";
}

// Log the configured PORT for debugging
console.log("Configured PORT:" , process.env.PORT);

// Create an instance of Express app
const app = express();

// Logging middleware: Log every incoming request's method and URL
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Middleware: Parse incoming JSON requests
app.use(express.json());

// Mount authRoutes for handling authentication endpoints
app.use('/api/auth', require('./routes/authRoutes'));
console.log('Mounted /api/auth routes');

// Connect to MongoDB using Mongoose
connectDB();

// Define a test route to verify the API is working
app.get('/', (req, res) => {
  // Respond with a simple message
  res.send('Welcome to ONE - Intermittent Fasting API');
});

// NEW: Mount fasting routes for intermittent fasting related endpoints
// Changing mount point from '/api/fasting' to '/fasting' to work with proxy configuration
app.use('/fasting', require('./routes/fastingRoutes'));

// NOTE: Remove or comment out any previous mounting of fasting routes that uses '/api/fasting'

// NEW: Start the server with error handling to try a new port if in use
const startingPort = process.env.PORT || 5001; // Default port

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  // Listen for errors such as port in use
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Trying a new port...`);
      startServer(port + 1);
    } else {
      console.error('Server encountered an error:', error);
    }
  });
}

app.all('*', (req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl}. Are you sure you're sending the request to the correct backend port? (e.g., http://localhost:5001)` });
});

startServer(parseInt(startingPort)); 