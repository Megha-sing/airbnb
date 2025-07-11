const path = require('path');
const express = require("express");
const userRouter = express.Router();
const rootDir=require("../utils/pathUtil");
const homesController = require("../controllers/store");

//home-page-user
userRouter.get("/homes", homesController.getRegisteredHomes);
userRouter.get("/bookings", homesController.getBookings);
userRouter.get("/favourite-list", homesController.getFavouriteList);
userRouter.get("/", homesController.getIndex);
userRouter.get("/homes/:homeId", homesController.getHomesDetails);
userRouter.post("/favourites", homesController.postAddToFavourites);
userRouter.post("/favourites/delete/:homeId", homesController.postRemoveFromFavourites);

module.exports=userRouter;