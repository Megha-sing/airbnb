const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const MongoUrl = "mongodb+srv://user:root@airbnb.ysia5nq.mongodb.net/?retryWrites=true&w=majority&appName=airbnb";
let _db;
const mongoConnect=(callback)=>{
MongoClient.connect(MongoUrl).then((client) => {
  callback(client);
  _db=client.db("airbnb");
}).catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});
}
const getDB = () => {
  if (_db) {
    return _db;
  }
  throw new Error("No database found!");
};
exports.mongoConnect=mongoConnect;
exports.getDB=getDB;