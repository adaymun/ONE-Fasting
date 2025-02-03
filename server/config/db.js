/*
 * db.js
 * Purpose: Establish a connection to the MongoDB database using Mongoose.
 */
const mongoose = require('mongoose');

/*
 * Function: connectDB
 * Purpose: Connects to the MongoDB database using the connection string from environment variables.
 */
function connectDB() {
  // Attempt to connect to MongoDB with provided URL and options
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB successfully'); // Log success
    })
    .catch((error) => {
      console.error('Database connection error:', error); // Log error if connection fails
    });
}

// Export the connectDB function for use in app.js
module.exports = connectDB; 