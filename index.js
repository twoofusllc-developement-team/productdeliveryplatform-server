  
  
const DB = require("./database").connectDB;
const express = require('express');

const personRoutes = require("./routers/personRoutes.js");
const loginRoutes = require("./routers/loginRoutes.js");

const app = express();
DB();

app.use(express.json())

app.use("/api/person", personRoutes)
app.use("/api/login", loginRoutes)

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});