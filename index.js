const express = require('express');
require('dotenv').config();
const cors = require('cors');
const DB = require("./database").connectDB;

const app = express(); // ✅ Declare app first!

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3001', // Adjust to your frontend port
  credentials: true                // Add this only if you're using cookies
}));

// Connect to database
DB();

// Middleware
app.use(express.json());

// Routes
const cartRoutes = require("./routers/cartRoutes.js");
const personRoutes = require("./routers/personRoutes.js");
const authRoutes = require('./routers/authRoutes.js');
const offeringsRoutes = require('./routers/offeringsRoutes.js');

app.use("/api/person", personRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/offerings", offeringsRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
