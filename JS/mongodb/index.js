const uri="mongodb+srv://salihaacikgoz:<password>@testdb.vbt8x53.mongodb.net/"

const mongoose=require("mongoose");
const express=require("express");
const app=express();
const cors=require("cors");

app.use(cors());
app.use(express.json());

mongoose.connect(uri).then(res=> {
    console.log("Connection is succesfull")
});

const todoSchema=new Schema({
    work: String,
    isCompleted: Boolean
});

const Todo=mongoose.model("Todo", todoSchema);
app.get("/api/getall", async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

app.listen("5000", ()=> console.log("htttp://localhost:5000 port üzerinden ayakta"));