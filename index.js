require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const app= express();


const myTodo = [];



app.use(express.json());




app.get("/", async (req,res)=>{
    try{
        res.json(myTodo);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

app.get("/myorxan/:id", async (req,res)=>{
    try{
        const id=req.params.id;
        const newTodo= myTodo.find(item => item.id === parseInt(id));
        res.json(newTodo);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});


app.post("/create", async (req,res)=>{
    try{

        const {Title,Description}=req.body;
        const newTodo = {id:uuidv4(),Title,Description};
        myTodo.push(newTodo);
        res.json(myTodo);


    }catch(err){
        res.status(400).json({message:err.message});
    }
});


app.put("/myput/:id",async (req,res)=>{


    try {
        const id = req.params.id;
        const { title, description } = req.body;

        const todoIndex = myTodo.findIndex(item => item.id === parseInt(id));

        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Güncellenecek Data Tapilmadi!' });
        }

        if (title) {
            myTodo[todoIndex].title = title;
        }
        if (description) {
            myTodo[todoIndex].description = description;
        }

        res.json(myTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.delete("/mydelete/:id", async (req,res)=>{
    try {
        const id = req.params.id;
        const index = myTodo.findIndex(item => item.id === parseInt(id));

        if (index === -1) {
            return res.status(404).json({ message: 'Data tapilmadi' });
        }

        myTodo.splice(index, 1);

        res.json(myTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.get("/download", async (req, res) => {
    try {
        const todosText = myTodo.map(todo => `ID: ${todo.id}\nTitle: ${todo.title}\nDescription: ${todo.description}\n`).join('\n');
        const filePath = 'todoArray.txt';

        fs.writeFileSync(filePath, todosText);

        res.download(filePath, (err) => {
            if (err) {
                res.status(500).send('Error downloading file');
            } else {
                console.log('File downloaded successfully');
                fs.unlinkSync(filePath);
            }
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error creating and downloading file');
    }
});








const port =5000;


app.listen(port,()=>{
    console.log(`server running on ${process.pid} ${port}`)
});



