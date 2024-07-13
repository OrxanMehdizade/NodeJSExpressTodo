require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const todoRoute = require("./routes/todoRoute");

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));


const app = express();

app.use(express.json());

app.use("/todos", todoRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on PID ${process.pid} at http://localhost:${port}`);
});
