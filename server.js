const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    res.send("Home Page");
});

app.get("/login",(req,res)=>{
    res.send("Login Page");
});

app.get("/register",(req,res)=>{
    res.send("Register Here");
});

app.listen(8000,()=>{
    console.log("The server is running on port 8000")
});