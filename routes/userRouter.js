const path = require('path');
const express = require("express");
const userRouter = express.Router();
const rootDir=require("../utils/pathUtil");

//home-page-user
userRouter.get("/",(req,res,next) =>{
res.sendFile(path.join(rootDir,"views","home.html"));
});

module.exports=userRouter;