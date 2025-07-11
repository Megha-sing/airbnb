exports.getAddHome = (req, res, next) => {
  // Render the correct path for addHome.ejs (likely in views/host/)
  res.render('host/editHome', { currentPage: 'AddHome' ,editing: false

  });
}

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true'; //true passed is string, so we convert it to boolean
  Home.findId(homeId, (home) => {
    if (!home) {
      console.log("Home not found with ID:", homeId);
      res.redirect('/host/host-home-list');
    }
    else{
      console.log(home);
       res.render('host/editHome', { home:home,currentPage: 'host-home', editing: editing});
    }
})}

const Home = require("../models/home");

exports.postAddHome = (req, res) => {
  const home = new Home(
    req.body.houseName,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.photoUrl
  );
  home.save();
  res.redirect('/');
}
exports.postEditHome = (req, res) => {
  const home = new Home(
    req.body.houseName,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.photoUrl
  );
  home.id = req.body.id;
  home.save();
  res.redirect('/host/host-home-list');
}
exports.getHostHomes = (req, res) => {
  Home.fetchAll((registeredHomes) => {
    res.render('host/host-home-list', { registeredHomes, currentPage: 'host-home' });
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Came to delete ', homeId);
  Home.deleteById(homeId, error => {
    if (error) {
      console.log('Error while deleting ', error);
    }
    res.redirect("/host/host-home-list");
  })
}