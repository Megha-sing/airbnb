const express = require("express");
const path = require('path');
const userRouter = require("./routes/userRouter");
const { hostRouter, registeredHomes } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorsController=require("./controllers/errors"); 
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

// serve static files (like CSS/images from public/)
app.use(express.static(path.join(rootDir, "public")));

// to parse form data
app.use(express.urlencoded({ extended: false }));

// user-side routes
app.use(userRouter);

// host-side routes
app.use("/host", hostRouter);

app.get("/", (req, res) => {
  res.render("home", { registeredHomes });
});

app.use(errorsController.pageNotFound);

const port = 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
