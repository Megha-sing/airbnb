
const Favourite = require("../models/favourites");
const Home = require("../models/home");
// Controller to fetch all homes from the model and render the home page
exports.getRegisteredHomes = (req, res) => {
  Home.fetchAll((registeredHomes) => {
    res.render('store/home-list', { registeredHomes, currentPage: 'homes' });
  });
};
exports.getIndex = (req, res,next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('store/index', { registeredHomes, currentPage: 'index' });
  });
};

exports.getBookings = (req, res,next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('store/bookings', { registeredHomes, currentPage: 'bookings' });
  });
};

exports.getFavouriteList = (req, res,next) => {
   Favourite.getFavourites(favourites => {
  Home.fetchAll((registeredHomes) => {
    const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id));
    res.render('store/favourite-list', { favouriteHomes, currentPage: 'favourite-list' });
  })
});
}
exports.postAddToFavourites = (req, res,next) => {
  console.log("Add to favourites",req.body  );
  Favourite.addToFavourites(req.body.id, (error) => {
    if (error) {
      console.log("Error adding to favourites:", error);
      return res.send(`<script>alert('Home is already marked favourite'); window.history.back();</script>`);
     
    }
  res.redirect("/favourite-list");
  })
};
exports.postRemoveFromFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, error => {
    if (error) {
      console.log('Error while removing from Favourite', error);
    }
    res.redirect("/favourite-list");
  })
}
exports.getHomesDetails = (req, res) => {
  const homeId = req.params.homeId;
  Home.findId(homeId, (homeFound) => {
    if (!homeFound) {
     res.redirect("/homes");
    }
    else{
     res.render('store/home-detail', { 
      home: homeFound,
      currentPage: 'homes' });

    }
   
  });
 
};