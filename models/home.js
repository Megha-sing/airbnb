// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    const homeDataPath = path.join(rootDir, "data", "homes.json");
    // Ensure the data directory exists
    fs.mkdir(path.dirname(homeDataPath), { recursive: true }, (dirErr) => {
      if (dirErr) {
        console.log("Directory creation failed", dirErr);
        return;
      }
      Home.fetchAll((registeredHomes) => {
        registeredHomes.push(this);
        fs.writeFile(homeDataPath, JSON.stringify(registeredHomes, null, 2), (error) => {
          if (error) {
            console.log("File Writing Failed", error);
          } else {
            console.log("File Writing Concluded");
          }
        });
      });
    });
  }

  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, "data", "homes.json");
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};