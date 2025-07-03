const path = require('path');
const express = require('express');
const hostRouter = express.Router();

const registeredHomes = [];

hostRouter.get('/add-home', (req, res) => {
  res.render('addHome', { currentPage: 'AddHome' });
});

hostRouter.post('/add-home', (req, res) => {
  console.log(req.body);

  const home = {
    houseName: req.body.houseName?.trim() || '',
    price: req.body.price?.trim() || '',
    location: req.body.location?.trim() || '',
    rating: req.body.rating?.trim() || '',
    photoUrl: req.body.photoUrl?.trim() || ''
  };

 
  if (
    !home.photoUrl.match(/^https?:\/\//) &&
    !home.photoUrl.startsWith('/')
  ) {
    home.photoUrl = '';
  }

  if (home.houseName && home.price && home.location) {
    registeredHomes.push(home);
  }

  res.redirect('/');
});

module.exports = {
  hostRouter,
  registeredHomes,
};
