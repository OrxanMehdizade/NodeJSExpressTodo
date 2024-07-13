require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoute");
const authRoutes = require("./routes/authRoutes");
const TODODB_URL = process.env.CONNECTION_STRING;

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect(TODODB_URL)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Error connecting to MongoDB Atlas", err));

    
app.use("/todos", todoRoutes);
app.use("/auth", authRoutes);



port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
