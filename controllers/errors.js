exports.pageNotFound = (req, res, next) => {
  res
    .status(404)
    .render("404", { 
      currentPage: "404",
       pageTitle: "Error",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
};