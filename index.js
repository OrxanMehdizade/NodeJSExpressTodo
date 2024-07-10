require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");
const todoRoute=require("./routes/todoRoute");

mongoose
    .connect(TODODB_URL)
    .then(()=>console.log("Connected to MongoDb"))
    .catch((err)=>console.error("Error connecting to MongoDB:", err));

const app= express();

app.use(express.json());

app.use("/Todos",todoRoute);




const port =5000;


app.listen(port,()=>{
    console.log(`server running on ${process.pid} ${port}`)
});



