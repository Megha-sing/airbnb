const path = require('path');
const express = require("express");
const userRouter = express.Router();
const rootDir=require("../utils/pathUtil");
const homesController = require("../controllers/home");

//home-page-user
userRouter.get("/", (req, res) => {
  res.render('home', { registeredHomes: homesController.getRegisteredHomes, currentPage: 'Home' });
});

module.exports=userRouter;