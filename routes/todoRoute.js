const express=require("express");
const router=express.Router();
const Todo=require("../models/todo");
const path = require("path");
const fs = require("fs");
const {authenticateAccessToken}=require("../middleware/authenticateAccessToken");

router.get("/",authenticateAccessToken, async (req,res)=>{
    try{
        const myTodo= await Todo.find();
        res.json(myTodo);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get("/myTodo/:id",authenticateAccessToken, async (req,res)=>{
    try{
        const newTodo= await Todo.findById(req.params.id);
        res.json(newTodo);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});


router.post("/create",authenticateAccessToken, async (req,res)=>{
    try{

        const {Titel,Content,Completed}=req.body;
        const todo= new Todo({Titel,Content,Completed});
        const newTodo = await todo.save();
        res.json(newTodo);

    }catch(err){
        res.status(400).json({message:err.message});
    }
});


router.put("/myput/:id",authenticateAccessToken,async (req,res)=>{


    try {
        const upTodo= await Todo.findByIdAndUpdate(req.params.id,{
            Titel:req.body.Title,
            Content:req.body.Content,
            Completed:req.body.Completed,
        },{new:true,runValidators:true});
        
        if(!upTodo)
            return res.status(404).json({message: "Todo Not Found"})
        
        res.status(200).json(upTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.delete("/mydelete/:id",authenticateAccessToken, async (req,res)=>{
    try {
        const todo = Todo.findByIdAndDelete(req.params.id);

        if (index === -1) {
            return res.status(404).json({ message: 'Data tapilmadi' });
        }

        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get("/download",authenticateAccessToken, async (req, res) => {
    try {
        const todosText = Todo.map(todo => `ID: ${todo.id}\nTitle: ${todo.title}\nContent: ${todo.content}\nCompleted: ${Completed}\n`).join('\n');
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

router.get("/search/:searchThem",authenticateAccessToken,async (req,res)=>{
    try{
        const searchValue=req.params.searchThem;
        const results = await Todo.find(
            {
                $or:[
                    {Title:{$regex:searchValue, $options:"i"}},
                    
                    {Content:{$regex:searchValue, $options:"i"}},
                    
                    {Completed:{$regex:searchValue, $options:"i"}},
                ]
    
            }
        );
        res.json(results);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

module.exports=router;