const path=require('path');
const express = require("express");
const hostRouter = express.Router();
const rootDir=require("../utils/pathUtil");

//add-home
hostRouter.get("/add-home",(req,res,next) =>{
res.sendFile(path.join(rootDir,"views","addHome.html"));
});

//home-added
hostRouter.post("/add-home",(req,res,next) =>{
res.sendFile(path.join(rootDir,"views","homeAdded.html"));
});



module.exports=hostRouter;