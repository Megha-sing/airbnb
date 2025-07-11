// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const Favourite = require("./favourites");

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
        if(this.id) {
          registeredHomes = registeredHomes.map(home => {
            if (home.id === this.id) {
                return this;
            }
              return home;
          });
        }
        else {
                this.id=Math.random().toString(36).substring(2, 15); 
                registeredHomes.push(this);

        }
        
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
      if (err) {
        // If file doesn't exist or can't be read, return empty array
        callback([]);
        return;
      }
      try {
        // If file is empty, return empty array
        if (!data || data.length === 0) {
          callback([]);
        } else {
          callback(JSON.parse(data));
        }
      } catch (e) {
        // If JSON is invalid, return empty array
        callback([]);
      }
    });
  }
  static findId(homeId, callback) {
    this.fetchAll((homes) => {
      const homeFound = homes.find(h => h.id === homeId);
      callback(homeFound);
    });
  }
  static deleteById(homeId, callback) {
    const homeDataPath = path.join(rootDir, "data", "homes.json");
    this.fetchAll(homes => {
      homes = homes.filter(home => home.id !== homeId);
      Favourite
      fs.writeFile(homeDataPath, JSON.stringify(homes, null, 2), callback);
    });
  }
};