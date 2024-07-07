const mongoose=require("mongoose");

const todoSchema= new mongoose.Schema({
    Titel: {type:String,required:true},
    Description: {type:String,required:true},
    Check: {type:Boolean,default:false}
});

const Todo= mongoose.model("Todo", todoSchema);

module.exports=Todo;