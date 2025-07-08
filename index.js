const express = require('express');
const app = express();
const cors = require('cors');
const DB = require("./database").connectDB;
const personRoute = require('./routers/personrouter'); // Adjust path & name if needed
const offeringsRouter = require('./routers/offeringsrouter');
const authRouter = require('./routers/authrouter');
DB(); // Connect to D

app.use(express.json()); // Middleware to parse JSON
app.use(cors());
// Mount the person route
app.use("/api/persons", personRoute); // Now POST to /api/persons/create
//calling offerings route 
app.use("/api/offerings",offeringsRouter);
app.use("/api/auth",authRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
