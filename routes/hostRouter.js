const express = require('express');
const hostRouter = express.Router();
const homesController=require("../controllers/host");


hostRouter.get('/add-home',homesController.getAddHome);

hostRouter.post('/add-home', homesController.postAddHome);

hostRouter.get('/host-home-list', homesController.getHostHomes);

hostRouter.get('/editHome/:homeId', homesController.getEditHome);

hostRouter.post('/editHome/:homeId', homesController.postEditHome);

hostRouter.post('/deleteHome/:homeId', homesController.postDeleteHome);

module.exports = hostRouter;
