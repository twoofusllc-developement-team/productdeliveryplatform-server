require('dotenv').config();
const DB = require("./database").connectDB;
const express = require('express');


const cartRoutes = require("./routers/cartRoutes.js");
const personRoutes = require("./routers/personRoutes.js");
const authRoutes = require('./routers/authRoutes.js');
const offeringsRoutes = require('./routers/offeringsRoutes.js');


const app = express();
DB();

app.use(express.json())

app.use("/api/person", personRoutes)
app.use("/api/cart", cartRoutes)
app.use('/api/auth', authRoutes);
app.use("/api/offerings", offeringsRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});
