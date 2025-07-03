exports.getAddHome = (req, res,next) => {
  res.render('addHome', { currentPage: 'AddHome'  });
}



const registeredHomes = [];

exports.postAddHome = (req, res) => {
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
}
exports.getRegisteredHomes = registeredHomes;