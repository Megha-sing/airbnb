// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const favouriteDataPath = path.join(rootDir, "data", "favourite.json");
module.exports = class Favourite {
  static addToFavourites(id, callback) {
 Favourite.getFavourites((favourites) => {
      if (favourites.includes(id)) {
        callback("Home is already marked favourite");
      } else {
        favourites.push(id);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
}
static getFavourites(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
  static deleteById(delHomeId, callback) {
    Favourite.getFavourites(favourites => {
      // favourites is an array of IDs (strings)
      const updated = favourites.filter(id => id !== delHomeId);
      fs.writeFile(favouriteDataPath, JSON.stringify(updated, null, 2), callback);
    });
  }
}