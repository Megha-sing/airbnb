const path=require('path');
const express = require("express");
const hostRouter = express.Router();
const rootDir=require("../utils/pathUtil");

//add-home
hostRouter.get("/add-home",(req,res,next) =>{
res.render("addHome");
});

const registeredHomes = [];

//home-added
hostRouter.post("/add-home",(req,res,next) =>{
  
    registeredHomes.push({houseName:req.body.houseName});
  
res.render("homeAdded");
});




exports.registeredHomes = registeredHomes;
exports.hostRouter = hostRouter;